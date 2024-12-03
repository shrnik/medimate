import os

download_directory = './pubmed_baseline_files'

md5_files = [f for f in os.listdir(download_directory) if f.endswith('.md5')]

for md5_file in md5_files:
    file_path = os.path.join(download_directory, md5_file)
    try:
        os.remove(file_path)
        print(f"Deleted: {file_path}")
    except Exception as e:
        print(f"Failed to delete {file_path}: {e}")

print("All .md5 files have been processed.")
