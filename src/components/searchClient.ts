import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const attributes = ["release_date", "id", "title", "genres"];

export function searchClient (url: string, token: string) {
  const { searchClient } =  instantMeiliSearch(url, token, {
    primaryKey: "id",
    finitePagination: true,
    keepZeroFacets: true,
    meiliSearchParams: {
      attributesToHighlight: ["*"],
      attributesToRetrieve: attributes,
      // attributesToSnippet: ["content"]
    }
    // rankingRules: ["exactness", "attribute", "sort"]
  });

  // Use the meilisearch client to update ranking rules (client = new MeiliSearch({ host: "http:127.0.0.1:7700", apiKey: "someKey" }))
  // client.index('movies').updateRankingRules([
  //   'words',
  //   'typo',
  //   'proximity',
  //   'attribute',
  //   'sort',
  //   'exactness',
  //   'release_date:asc',
  //   'rank:desc'
  // ])

  return searchClient;
}
