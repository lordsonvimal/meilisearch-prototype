import { Meilisearch } from "meilisearch";
import meiliSearchData from "../meiliSearch.json" assert { type: "json" };

const { indexName, protocolIndexName, token, url } = meiliSearchData;

const client = new Meilisearch({
  host: url,
  apiKey: token
});

const LOCALHOST_IP = "192.168.1.33";

const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
};

const indexToUse = protocolIndexName;

const movieDocumentTemplate = "A movie titled {{doc.title}} whose description starts with {{doc.overview}} with multiple genres {{doc.genres}}";

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
    client.deleteIndex(indexToUse);
    client.createIndex(indexToUse);
    const response = await fetch(`${url}/indexes/${indexToUse}/settings`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        embedders: {
          custom: {
            source: "userProvided",
            dimensions: 384
          },
          default: {
            // apiKey: "OLLAMA_API_KEY", // Currently no API key present
            source: "ollama",
            model: "mxbai-embed-large",
            documentTemplate: `A clinical trial study with nct id {{doc.id}}.
              Orgaization of the study is {{doc.organization_name}}. The official title of the study is {{doc.title}}.
              The phases of the study are {{doc.phases}}. The study is to test the condition {{doc.conditions}}.
              The eligibility criteria of the study is {{doc.eligibility_criteria}}. This study's lead sponsor is {{doc.lead_sponsor}}. Primary outcomes of the study are {{doc.primary_outcomes}}.
              Secondary outcomes of the study are {{doc.secondary_outcomes}}. Arms interventions are {{doc.interventions}} with types {{doc.intervention_types}}. The summary of the study is {{doc.summary}}.`,
            // distribution: {
            //   mean: 0.7,
            //   sigma: 0.3
            // },
            url: `http://${LOCALHOST_IP}:11434/api/embeddings`
          }
        }
      })
    });

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
