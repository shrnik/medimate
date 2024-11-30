import os
import gzip
import shutil

# Directory containing the downloaded .gz files
download_directory = './pubmed_baseline_files'

# Range of files to unzip
start_file_index = 6
end_file_index = 256

# Iterate through the range of .gz files
for i in range(start_file_index, end_file_index + 1):
    gz_filename = f"pubmed24n{i:04d}.xml.gz"  # Format filename as pubmed24nXXXX.xml.gz
    gz_file_path = os.path.join(download_directory, gz_filename)

    # Check if the .gz file exists
    if not os.path.exists(gz_file_path):
        print(f"File not found: {gz_filename}, skipping.")
        continue

    # Define the path for the unzipped file
    unzipped_file_path = os.path.splitext(gz_file_path)[0]  # Remove .gz extension

    try:
        print(f"Unzipping {gz_filename}...")
        # Open the .gz file and the target unzipped file
        with gzip.open(gz_file_path, 'rb') as f_in:
            with open(unzipped_file_path, 'wb') as f_out:
                shutil.copyfileobj(f_in, f_out)  # Decompress and write the contents
        print(f"Successfully unzipped {gz_filename} to {unzipped_file_path}")
    except Exception as e:
        print(f"Failed to unzip {gz_filename}: {e}")

print("Unzipping process complete!")
