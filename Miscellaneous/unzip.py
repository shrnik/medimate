import os
import gzip
import shutil

download_directory = './pubmed_baseline_files'

start_file_index = 6
end_file_index = 256

for i in range(start_file_index, end_file_index + 1):
    gz_filename = f"pubmed24n{i:04d}.xml.gz"
    gz_file_path = os.path.join(download_directory, gz_filename)

    if not os.path.exists(gz_file_path):
        print(f"File not found: {gz_filename}, skipping.")
        continue

    unzipped_file_path = os.path.splitext(gz_file_path)[0]

    try:
        print(f"Unzipping {gz_filename}...")
        with gzip.open(gz_file_path, 'rb') as f_in:
            with open(unzipped_file_path, 'wb') as f_out:
                shutil.copyfileobj(f_in, f_out)
        print(f"Successfully unzipped {gz_filename} to {unzipped_file_path}")
    except Exception as e:
        print(f"Failed to unzip {gz_filename}: {e}")

print("Unzipping process complete!")
