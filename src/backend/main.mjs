import { Meilisearch } from "meilisearch";
import meiliSearchData from "../meiliSearch.json" assert { type: "json" };
import movies from "../../data/movies.json" assert { type: "json" };

const { indexName, token, url } = meiliSearchData;

const client = new Meilisearch({
  host: url,
  apiKey: token
});

// client.cancelTasks({ uids: [45] });
client.index(indexName).deleteAllDocuments().then(res => console.log(res));
client.index(indexName).addDocuments(movies.splice(0, 10)).then((res) => console.log(res));

client.index(indexName).updateFilterableAttributes(["genres", "_rankingScore"]);

const filterableAttributes = client.index(indexName).getFilterableAttributes().then(res => console.log(res));
