import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import axios, { AxiosHeaders, Method } from "axios";

const attributes = ["release_date", "id", "title", "genres", "overview"];

const meiliSearchParams = {
  attributesToHighlight: ["*"],
  attributesToRetrieve: attributes,
  retrieveVectors: true,
  showRankingScore: true,
  hybrid: {
    embedder: "custom",
    semanticRatio: 0,
  },
};

export function searchClient (url: string, token: string) {
  const { searchClient } =  instantMeiliSearch(url, token, {
    httpClient: async (url, options) => {
      const data = typeof options?.body === "string" ? JSON.parse(options.body) : {};
      let vector = [];
      if (meiliSearchParams.hybrid.semanticRatio > 0) {
        const embeddingResponse = await axios.post("http://localhost:5151/get_embedding", { text: data.queries[0].q || "" });
        vector = embeddingResponse.data.embedding;
        console.log(vector);
        if (Array.isArray(data.queries)) {
      }
        data.queries.forEach(query => {
          query.vector = vector;
          // query.filter = "_rankingScore > 0.2";
          Object.keys(meiliSearchParams).forEach(key => {
            query[key] = meiliSearchParams[key];
          })
        });
      }

      const response = await axios.request({
        data: JSON.stringify(data),
        headers: options?.headers as AxiosHeaders,
        method: options?.method?.toLocaleUpperCase() as Method ?? "GET",
        url
      });
      return response.data;
    },
    primaryKey: "id",
    finitePagination: true,
    keepZeroFacets: true,
    meiliSearchParams
  });

  return searchClient;
}
