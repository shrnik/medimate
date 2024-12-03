from ftplib import FTP, error_perm
import os

ftp = FTP('ftp.ncbi.nlm.nih.gov')
ftp.login() 
ftp.cwd('/pubmed/baseline')

files = ftp.nlst()

local_dir = './pubmed_baseline_files'
os.makedirs(local_dir, exist_ok=True)

start_file = 'pubmed24n1101.xml.gz'
end_file = 'pubmed24n1200.xml.gz'

filtered_files = [f for f in files if start_file <= f <= end_file]

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
