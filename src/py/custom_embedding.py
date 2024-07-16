import os
import json
import time
from dotenv import load_dotenv
from langchain_community.vectorstores import Meilisearch
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.schema import Document
import meilisearch
import torch
from transformers import AutoTokenizer, AutoModel

# load_dotenv()

# if "MEILI_HTTP_ADDR" not in os.environ:
#     raise Exception("Missing MEILI_HTTP_ADDR env var")
# if "MEILI_API_KEY" not in os.environ:
#     raise Exception("Missing MEILI_API_KEY env var")

meilisearch_server = "http://localhost:7700/"
os.environ["MEILI_HTTP_ADDR"] = meilisearch_server
os.environ["MEILI_MASTER_KEY"] = "764d6db36d1a146212833f7338386929620f9e04ec7a8c6ee0d746d018036220"  
index_name = "movies"
model_name = "sentence-transformers/all-MiniLM-L6-v2"
model_dimensions = 384
embedder_name = "custom"

client = meilisearch.Client(meilisearch_server)
index = client.index(index_name)

# Load the tokenizer and model from Hugging Face
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

start_time = time.time()

def generate_embedding(text):
    inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    # Mean pooling to get the sentence embedding
    embeddings = outputs.last_hidden_state.mean(dim=1).numpy()
    return embeddings.flatten().tolist()

# Delete all documents
index.delete_all_documents()

with open("./data/movies.json", "r", encoding="utf-8") as file:
    data = json.load(file)

documents = []
for item in data:
    combined_text = f"This is a movie with title {item.get('title', '')} released on {item.get('release_date', '')} with the plot: {item.get('overview', '')}"
    embedding = generate_embedding(combined_text)
    document = {
        "id": item.get("id", ""),
        "title": item.get("title", ""),
        "genres": item.get("genres", []),
        "poster": item.get("poster", ""),
        "release_date": item.get("release_date", ""),
        "overview": item.get("overview", ""),
        "_vectors": {
            "custom": embedding
        }
    }
    documents.append(document)

# text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
# docs = text_splitter.split_documents([Document(page_content=doc["overview"], metadata=doc) for doc in documents])

# embeddings = SentenceTransformerEmbeddings(model_name=model_name)
# embedders = {
#     "custom": {
#         "source": "userProvided",
#         "dimensions": model_dimensions
#     }
# }

# Function to add documents in batches using from_documents
# def add_documents_in_batches(docs, batch_size=100):
#     for i in range(0, len(docs), batch_size):
#         batch_docs = docs[i:i + batch_size]
#         Meilisearch.from_documents(
#             documents=batch_docs,
#             embedding=embeddings,
#             embedders=embedders,
#             embedder_name=embedder_name,
#             index_name=index_name
#         )

def add_documents_in_batches(docs, batch_size=100):
    for i in range(0, len(docs), batch_size):
        batch_docs = docs[i:i + batch_size]
        index.add_documents(batch_docs)

add_documents_in_batches(documents)

end_time = time.time()

print(f"completed in {end_time - start_time} seconds.")
