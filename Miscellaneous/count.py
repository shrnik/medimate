import chromadb
from sentence_transformers import SentenceTransformer

client = chromadb.HttpClient(host= '157.245.81.235', port = 8010)

collection_name = "pubmed_articles"

collection = client.get_or_create_collection(collection_name)

model = SentenceTransformer('all-MiniLM-L6-v2')

print(collection.count())

# Retrieve the document with ID
result = collection.get(ids=["article_227240"])

# Print the retrieved document
print("Retrieved Document:")
print(result)
