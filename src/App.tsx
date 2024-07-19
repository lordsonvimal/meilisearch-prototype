import React from "react";
import { FacetedSearch } from "./components/FacetedSearch";
import meiliSearchData from "./meiliSearch.json";
import "./stylesheets/global.scss";
import "./stylesheets/faceted-search.scss";

const indexName = meiliSearchData.indexName;
const token = meiliSearchData.token;
const url = meiliSearchData.url;

export function App() {
  return (
    <>
      <FacetedSearch indexName={indexName} searchToken={token} searchUrl={url} />
    </>
  );
}
