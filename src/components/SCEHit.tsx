// @flow
import React from "react";
import { Highlight, Snippet } from "react-instantsearch";

type Props = { hit: any };

function label(txt: string) {
  return (
    <b>
      <span className="subheading">{txt + ": "}</span>
    </b>
  );
}

/* eslint react/no-multi-comp:0 */
/* eslint react/prop-types:0 */
export function SCEHit({ hit }: Props) {
  // <i aria-hidden="true" className="fa fa-external-link external-link" />
  return (
    <>
      <div className="hit-description">
        <b>
          <Highlight attribute="title" hit={hit} />
        </b>
      </div>
      <div className="hit-path">
        <Highlight attribute="genres" hit={hit} />
      </div>
      {/* <div className="hit-updated">
        {hit.updated_at}
      </div> */}
      <div className="hit-content">
        <div className="hit-content-texts">
          <Snippet attribute="overview" hit={hit} />
        </div>
      </div>
    </>
  );
}
