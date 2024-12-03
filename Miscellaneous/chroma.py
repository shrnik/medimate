import chromadb
import json
from sentence_transformers import SentenceTransformer

input_file_path = './articles.json'
with open(input_file_path, 'r', encoding='utf-8') as file:
    articles = json.load(file)

client = chromadb.HttpClient(host= '157.245.81.235', port = 8010)

collection_name = "pubmed_articles"

collection = client.get_or_create_collection(collection_name)
print("Connected to the remote Chroma database.")

model = SentenceTransformer('all-MiniLM-L6-v2')

for idx, article in enumerate(articles):

    title = article["Article Title"]
    abstract = article["Abstract"]
    
    document = title + " " + abstract
    
    embedding = model.encode(document).tolist()
    
    collection.add(
        ids=[f"article_{idx}"],
        documents=[document],
        metadatas=[{"title": title}],
        embeddings=[embedding]
    )
    print(f"Added article {idx+1} to the remote Chroma database.")

print(f"Successfully added {len(articles)} articles to the remote Chroma database.")

query = "What is Delineation?"
query_embedding = model.encode(query).tolist()

results = collection.query(
    query_embeddings=[query_embedding],
    n_results=1
)

print("Query Results:", results)
