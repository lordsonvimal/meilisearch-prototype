import React from "react";
import { SCESearch, SearchProps } from "./SCESearch";
import { SearchClientOptions } from "./searchClient";

export function SearchProto(props: SearchProps & { options: SearchClientOptions }) {
  setTimeout(() => {
    const input = document.querySelector(".ais-SearchBox-input");
    if (input instanceof HTMLElement) input.focus();
  }, 500);

  return <SCESearch {...props} />;
}
