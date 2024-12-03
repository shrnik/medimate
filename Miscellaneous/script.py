import re
import os
import json

input_directory = './pubmed_baseline_files'

output_file_path = './articles.json'

start_file_index = 1
end_file_index = 17

articles = []

for i in range(start_file_index, end_file_index + 1):
    filename = f"pubmed24n{i:04d}.xml"
    file_path = os.path.join(input_directory, filename)
    
    if not os.path.exists(file_path):
        print(f"File not found: {filename}, skipping.")
        continue

    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    titles = re.findall(r'<ArticleTitle>(.*?)</ArticleTitle>', content, re.DOTALL)
    abstracts = re.findall(r'<AbstractText>(.*?)</AbstractText>', content, re.DOTALL)

    for title, abstract in zip(titles, abstracts):
        articles.append({
            "Article Title": title.strip(),
            "Abstract": abstract.strip()
        })
    
    print(f"Processed file: {filename}")

with open(output_file_path, 'w', encoding='utf-8') as output_file:
    json.dump(articles, output_file, indent=4)

print(f"Extracted data from {len(articles)} articles and saved to {output_file_path}")
