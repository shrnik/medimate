import os

# Directory containing the .gz files
download_directory = './pubmed_baseline_files'

# Range of .gz files to delete
start_file_index = 21
end_file_index = 82

# Iterate through the range of .gz files to delete
for i in range(start_file_index, end_file_index + 1):
    gz_filename = f"pubmed24n{i:04d}.xml"
    gz_file_path = os.path.join(download_directory, gz_filename)

    # Check if the .gz file exists
    if os.path.exists(gz_file_path):
        try:
            os.remove(gz_file_path)
            print(f"Deleted: {gz_filename}")
        except Exception as e:
            print(f"Failed to delete {gz_filename}: {e}")
    else:
        print(f"File not found: {gz_filename}, skipping.")

print("Deletion process complete!")
