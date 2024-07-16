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
import json

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

search_text = "movie about an archeologist"
search_vector = generate_embedding(search_text)

results = index.search(search_text, {
    # "retrieveVectors": True,
    "limit": 5,
    "vector": search_vector,
    "showRankingScore": True,
    "hybrid": {
        "semanticRatio": 0.9,
        "embedder": embedder_name
    }
})

print(results)

with open("search_vector.json", "w+") as f:
    json.dump(search_vector, f)

end_time = time.time()

print(f"completed in {end_time - start_time} seconds.")
