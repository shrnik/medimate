from ftplib import FTP, error_perm
import os

# Connect to FTP server
ftp = FTP('ftp.ncbi.nlm.nih.gov')
ftp.login()  # Anonymous login
ftp.cwd('/pubmed/baseline')  # Navigate to the target directory

# List all files in the directory
files = ftp.nlst()

# Local directory to save files
local_dir = './pubmed_baseline_files'
os.makedirs(local_dir, exist_ok=True)

# Define the range of files to download
start_file = 'pubmed24n1101.xml.gz'
end_file = 'pubmed24n1200.xml.gz'

# Filter files within the desired range
filtered_files = [f for f in files if start_file <= f <= end_file]

# Download each filtered file
for filename in filtered_files:
    local_filepath = os.path.join(local_dir, filename)
    try:
        print(f"Downloading {filename}...")
        with open(local_filepath, 'wb') as local_file:
            ftp.retrbinary(f"RETR {filename}", local_file.write)
    except error_perm as e:
        print(f"Permission error for {filename}: {e}")
    except Exception as e:
        print(f"An error occurred while downloading {filename}: {e}")
    else:
        print(f"Successfully downloaded {filename}")

ftp.quit()
print("Download process complete!")
