import { Meilisearch } from "meilisearch";
import meiliSearchData from "../meiliSearch.json" assert { type: "json" };

const { indexName, token, url } = meiliSearchData;

const client = new Meilisearch({
  host: url,
  apiKey: token
});

const LOCALHOST_IP = "192.168.1.33";

const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
};

async function enableSemanticSearch() {
  try {
    // Run this before changing embedders
    // curl -XPOST localhost:7700/indexes/movies/documents -H "Content-type: Application/json" -d @movies.json

    // Cancel running tasks by uids
    // client.cancelTasks({ uids: [41] });

    // const promise = await fetch(`${url}/experimental-features`, {
    //   body: JSON.stringify({ vectorStore: true }),
    //   headers,
    //   method: "PATCH",
    // });
    // const json = await promise.json();
    // const response = await fetch(`${url}/indexes/${indexName}/settings`, {
    //   method: "PATCH",
    //   headers,
    //   body: JSON.stringify({
    //     embedders: {
    //       default: {
    //         // apiKey: "OLLAMA_API_KEY", // Currently no API key present
    //         source: "ollama",
    //         model: "llama3",
    //         documentTemplate: "A movie titled {{doc.title}} whose description starts with {{doc.overview}} with multiple genres {{doc.genres}}",
    //         distribution: {
    //           mean: 0.7,
    //           sigma: 0.3
    //         },
    //         url: `http://${LOCALHOST_IP}:11434/api/embeddings`
    //       }
    //     }  
    //   })
    // });

    // To view ollama logs
    // tail -f ~/.ollama/logs/server.log

    // console.log(await response.json());
    // const embedders = await client.index(indexName).updateSettings({
    //   embedders: {
    //     default: {
    //       // apiKey: "OLLAMA_API_KEY", // Currently no API key present
    //       source: "ollama",
    //       model: "llama3",
    //       documentTemplate: "A movie titled {{doc.title}} whose description starts with {{doc.overview}} with multiple genres {{doc.genres}}",
    //       distribution: {
    //         mean: 0.7,
    //         sigma: 0.3
    //       },
    //       url: `http://${LOCALHOST_IP}:11434/api/embeddings`
    //     }
    //   }
    // });
    // console.log(embedders);
    // console.log(await client.index(indexName).getEmbedders());
  } catch (e) {
    console.log(e);
  }
}

enableSemanticSearch();
