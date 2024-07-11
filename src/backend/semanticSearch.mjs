import { Meilisearch } from "meilisearch";
import meiliSearchData from "../meiliSearch.json" assert { type: "json" };

const { indexName, token, url } = meiliSearchData;

const client = new Meilisearch({
  host: url,
  apiKey: token
});

const LOCALHOST_IP = "192.168.1.33";

async function enableSemanticSearch() {
  try {
    const promise = await fetch(`${url}/experimental-features`, {
      body: JSON.stringify({ vectorStore: true }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "PATCH",
    });
    const json = await promise.json();
    const embedders = await client.index(indexName).updateEmbedders({
      default: {
        // apiKey: "OLLAMA_API_KEY", // Currently no API key present
        source: "ollama",
        model: "llama3",
        documentTemplate: "A movie titled {{doc.title}} whose description starts with {{doc.overview|truncatewords: 20}} with multiple genres {{doc.genres}}",
        distribution: {
          mean: 0.7,
          sigma: 0.3
        },
        url: `http://${LOCALHOST_IP}:11434/api/embeddings`
      }
    });
    console.log(embedders);
    console.log(await client.index(indexName).getEmbedders());
  } catch (e) {
    console.log(e);
  }
}

enableSemanticSearch();
