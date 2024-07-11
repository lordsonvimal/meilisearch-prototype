import React from "react";
import { SCEHit } from "./SCEHit";
import { Hits, useInstantSearch } from "react-instantsearch";

function SearchLoader() {
  const { status } = useInstantSearch();
  const isLoading = status === "stalled" || status === "loading";
  if (!isLoading) return null;

  return <div>Loading...</div>;
}

export function SCEHits() {
  return (
    <div className="faceted-search-result-container">
      <SearchLoader />
      <Hits hitComponent={({ hit }) => <SCEHit hit={hit} key={hit.__position} />} key="search-hits" />
    </div>
  );
}
