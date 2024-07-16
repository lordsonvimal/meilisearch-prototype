import os
import json
import time
from dotenv import load_dotenv
from langchain_community.vectorstores import Meilisearch
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.schema import Document
import meilisearch

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

# Delete all documents
index.delete_all_documents()

with open("./data/movies.json", "r", encoding="utf-8") as file:
    data = json.load(file)

documents = []
for item in data:
    document = Document(
        page_content=item.get("overview", ""),
        metadata={
            "id": item.get("id", ""),
            "title": item.get("title", ""),
            "genres": item.get("genres", []),
            "poster": item.get("poster", ""),
            "release_date": item.get("release_date", "")
        }
    )
    documents.append(document)

text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
docs = text_splitter.split_documents(documents)

embeddings = SentenceTransformerEmbeddings(model_name=model_name)
embedders = {
    "custom": {
        "source": "userProvided",
        "dimensions": model_dimensions
    }
}

start_time = time.time()

vector_store = Meilisearch.from_documents(
    documents=docs,
    embedding=embeddings,
    embedders=embedders,
    embedder_name=embedder_name,
    index_name=index_name
)

end_time = time.time()

print(f"Indexing completed in {end_time - start_time} seconds.")
