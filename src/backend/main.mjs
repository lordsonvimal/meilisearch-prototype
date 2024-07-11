import { Meilisearch } from "meilisearch";
import meiliSearchData from "../meiliSearch.json" assert { type: "json" };
import movies from "../../data/movies.json" assert { type: "json" };

const { indexName, token, url } = meiliSearchData;

const client = new Meilisearch({
  host: url,
  apiKey: token
});

client.index(indexName).addDocuments(movies).then((res) => console.log(res));

const filterableAttributes = client.index(indexName).getFilterableAttributes();
console.log(filterableAttributes);

client.index(indexName).updateFilterableAttributes(["genres"]);
