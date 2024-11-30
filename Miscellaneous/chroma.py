import chromadb
import json
from sentence_transformers import SentenceTransformer

# Load the JSON file containing article titles and abstracts
input_file_path = './articles.json'
with open(input_file_path, 'r', encoding='utf-8') as file:
    articles = json.load(file)

client = chromadb.HttpClient(host= '157.245.81.235', port = 8010)

# Define the collection name
collection_name = "pubmed_articles"

# Create or get the collection on the remote server
collection = client.get_or_create_collection(collection_name)
# print(collection.peek())
print("Connected to the remote Chroma database.")

# Initialize the Sentence Transformer model for embeddings
model = SentenceTransformer('all-MiniLM-L6-v2')

# Prepare and insert data into the Chroma database on the remote server
for idx, article in enumerate(articles):

    title = article["Article Title"]
    abstract = article["Abstract"]
    
    # Combine the title and abstract as the document to embed
    document = title + " " + abstract
    
    # Generate embeddings for the document
    embedding = model.encode(document).tolist()  # Convert numpy array to list for Chroma
    
    # Insert the document into the Chroma collection on the remote server
    collection.add(
        ids=[f"article_{idx}"],  # Unique ID for each document
        documents=[document],
        metadatas=[{"title": title}],
        embeddings=[embedding]
    )
    print(f"Added article {idx+1} to the remote Chroma database.")

print(f"Successfully added {len(articles)} articles to the remote Chroma database.")

# Example query to search for documents in the remote Chroma database
query = "What is Delineation?"
query_embedding = model.encode(query).tolist()

# Perform the query on the remote Chroma database
results = collection.query(
    query_embeddings=[query_embedding],
    n_results=1  # Number of results to return
)

print("Query Results:", results)
