import os
from dotenv import load_dotenv
from langchain_community.vectorstores import Meilisearch
from langchain_community.embeddings import SentenceTransformerEmbeddings


load_dotenv()

if "MEILI_HTTP_ADDR" not in os.environ:
    raise Exception("Missing MEILI_HTTP_ADDR env var")
if "MEILI_API_KEY" not in os.environ:
    raise Exception("Missing MEILI_API_KEY env var")


os.environ["MEILI_HTTP_ADDR"] = "http://localhost:7700/"
os.environ["MEILI_MASTER_KEY"] = "7adc6dec65e0a6958679ddc833e98df0cc9de1d82dbc31925127dbd55b3980d4"  


embedding_model = SentenceTransformerEmbeddings()


def query_vector_store(query, embedder_name="custom", num_results=3):
    
    vector_store = Meilisearch(
        index_name="movies-lite-fv4",
        embedders={
            embedder_name: {
                "source": "userProvided",
                "dimensions": 768
            }
        },
        embedding=embedding_model
    )

    
    query_vector = embedding_model.embed_documents([query])[0]  

   
    search_results_with_scores = vector_store.similarity_search_by_vector_with_scores(query_vector, embedder_name=embedder_name)

    
    for i, (result, score) in enumerate(search_results_with_scores[:num_results]):
        title = result.metadata.get('title', 'No Title')
        content = result.page_content
        print(f"Result {i+1}:\nTitle: {title}\nContent: {content}\nScore: {score}\n")

# Example query
query = "movie with character with name Bruce Wayne"
query_vector_store(query)
