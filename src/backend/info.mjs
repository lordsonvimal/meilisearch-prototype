import { Meilisearch } from "meilisearch";
import meiliSearchData from "../meiliSearch.json" assert { type: "json" };

const { indexName, token, url } = meiliSearchData;

const client = new Meilisearch({
  host: url,
  apiKey: token
});

const LOCALHOST_IP = "192.168.1.33";

async function getSettings() {
  try {
    const settings = await client.index(indexName).getSettings();
    console.log(settings);
    console.log(await client.index(indexName).getEmbedders());
  } catch(e) {
    console.log(e);
  }
}

getSettings();
