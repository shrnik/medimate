import os

# Define the directory containing the downloaded files
download_directory = './pubmed_baseline_files'

# Get a list of all .md5 files in the directory
md5_files = [f for f in os.listdir(download_directory) if f.endswith('.md5')]

# Loop through and delete each .md5 file
for md5_file in md5_files:
    file_path = os.path.join(download_directory, md5_file)
    try:
        os.remove(file_path)
        print(f"Deleted: {file_path}")
    except Exception as e:
        print(f"Failed to delete {file_path}: {e}")

print("All .md5 files have been processed.")
