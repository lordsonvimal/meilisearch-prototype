import React from "react";
import { SCESearch, SearchProps } from "./SCESearch";

export function SearchProto(props: SearchProps) {
  setTimeout(() => {
    const input = document.querySelector(".ais-SearchBox-input");
    if (input instanceof HTMLElement) input.focus();
  }, 500);

  return <SCESearch {...props} />;
}
