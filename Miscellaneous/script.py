import re
import os
import json

# Directory containing the .xml files
input_directory = './pubmed_baseline_files'

# Define the output JSON file
output_file_path = './articles.json'

# Range of files to process
start_file_index = 1
end_file_index = 17

# List to store article data
articles = []

# Iterate through the range of files
for i in range(start_file_index, end_file_index + 1):
    filename = f"pubmed24n{i:04d}.xml"  # Format filename as pubmed24nXXXX.xml
    file_path = os.path.join(input_directory, filename)
    
    # Check if the file exists
    if not os.path.exists(file_path):
        print(f"File not found: {filename}, skipping.")
        continue

    # Open and read the current XML file
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Extract article titles and abstracts
    titles = re.findall(r'<ArticleTitle>(.*?)</ArticleTitle>', content, re.DOTALL)
    abstracts = re.findall(r'<AbstractText>(.*?)</AbstractText>', content, re.DOTALL)

    # Combine titles and abstracts into the articles list
    for title, abstract in zip(titles, abstracts):
        articles.append({
            "Article Title": title.strip(),
            "Abstract": abstract.strip()
        })
    
    print(f"Processed file: {filename}")

# Write all extracted data to the output JSON file
with open(output_file_path, 'w', encoding='utf-8') as output_file:
    json.dump(articles, output_file, indent=4)

print(f"Extracted data from {len(articles)} articles and saved to {output_file_path}")
