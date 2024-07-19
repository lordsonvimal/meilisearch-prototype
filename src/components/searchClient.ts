import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import axios, { AxiosHeaders, Method } from "axios";

const attributes = ["release_date", "id", "title", "genres", "overview", "poster"];

export type SearchClientOptions = {
  semanticRatio: number,
  embedder: string
};

function getParams(options: SearchClientOptions) {
  return {
    attributesToHighlight: ["*"],
    attributesToRetrieve: attributes,
    retrieveVectors: true,
    showRankingScore: true,
    hybrid: {
      embedder: options.embedder,
      semanticRatio: options.semanticRatio,
    },
  }
}

export function searchClient (url: string, token: string, options: SearchClientOptions) {
  const isCustom = options.embedder === "custom";
  const meiliSearchParams = getParams(options);
  const { searchClient } =  instantMeiliSearch(url, token, {
    httpClient: isCustom ? async (url, options) => {
      const data = typeof options?.body === "string" ? JSON.parse(options.body) : {};
      let vector = [];
      if (meiliSearchParams.hybrid.semanticRatio > 0) {
        const embeddingResponse = await axios.post("http://localhost:5151/get_embedding", { text: data.queries[0].q || "" });
        vector = embeddingResponse.data.embedding;
        if (Array.isArray(data.queries)) {
      }
        data.queries.forEach(query => {
          query.vector = vector;
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
    } : undefined,
    primaryKey: "id",
    finitePagination: true,
    keepZeroFacets: true,
    meiliSearchParams
  });

  return searchClient;
}
