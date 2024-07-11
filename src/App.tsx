import React from "react";
import { FacetedSearch } from "./components/FacetedSearch";

const indexName = "";
const token = "";
const url = "";

export function App() {
  return (
    <>
      <h1>Meilisearch prototype</h1>
      <FacetedSearch indexName={indexName} searchToken={token} searchUrl={url} />
    </>
  );
}
