import React, { useState } from "react";
import { SearchProto } from "./SearchProto";
import { SearchProps } from "./SCESearch";

export function FacetedSearch(props: SearchProps) { 
  const isSearchConfigured = props.searchToken && props.searchUrl;
  const [semanticRatio, setSemanticRatio] = useState(0);
  const [embedder, setEmbedder] = useState("custom");

  return (
    <>
      <div className="faceted_search-title">
        <h1>Search movies</h1>
        <div className="slider"><input type="range" min={0} max={1} onChange={(e) => {
          setSemanticRatio(parseFloat(e.target.value))
        }} step={0.1} value={semanticRatio} />{semanticRatio}</div>
        <button className={`btn-search-mode ${embedder === "default" ? "btn-search-mode--selected" : ""}`} onClick={() => setEmbedder("default")}>Auto</button>
        <button className={`btn-search-mode ${embedder === "custom" ? "btn-search-mode--selected" : ""}`} onClick={() => setEmbedder("custom")}>Custom</button>
      </div>
      {!isSearchConfigured && <h5>Please configure the Search Engine properties to enable searching.</h5>}
      {isSearchConfigured && <SearchProto {...props} options={{ embedder, semanticRatio }} />}
    </>
  );
}
