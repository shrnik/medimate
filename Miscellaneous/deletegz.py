import os

download_directory = './pubmed_baseline_files'

start_file_index = 21
end_file_index = 82

for i in range(start_file_index, end_file_index + 1):
    gz_filename = f"pubmed24n{i:04d}.xml"
    gz_file_path = os.path.join(download_directory, gz_filename)

    if os.path.exists(gz_file_path):
        try:
            os.remove(gz_file_path)
            print(f"Deleted: {gz_filename}")
        except Exception as e:
            print(f"Failed to delete {gz_filename}: {e}")
    else:
        print(f"File not found: {gz_filename}, skipping.")

print("Deletion process complete!")
