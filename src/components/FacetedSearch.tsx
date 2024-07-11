import React from "react";
import { SearchProto } from "./SearchProto";
import { SearchProps } from "./SCESearch";

export function FacetedSearch(props: SearchProps) { 
  const isSearchConfigured = props.searchToken && props.searchUrl;
  return (
    <>
      {!isSearchConfigured && <h5>Please configure the Search Engine properties to enable searching.</h5>}
      {isSearchConfigured && <SearchProto {...props} />}
    </>
  );
}
