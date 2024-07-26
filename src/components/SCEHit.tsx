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
  console.log(hit);
  
  return (
    <>
      <div>
        <img src={hit.poster} height={100} />
      </div>
      <div>
        <div className="hit-description">
          <b>
            <Highlight attribute="id" hit={hit} />:&nbsp;
            <Highlight attribute="title" hit={hit} />
          </b>
        </div>
        <div className="hit-path">
          <Highlight attribute="organization_name" hit={hit} />&nbsp;|&nbsp;
          {hit.organization_name !== hit.lead_sponsor && <><Highlight attribute="lead_sponsor" hit={hit} />&nbsp;|&nbsp;</>}
          <Highlight attribute="conditions" hit={hit} />&nbsp;|&nbsp;
          <Highlight attribute="phases" hit={hit} />&nbsp;|&nbsp;
          <span className="ais-Highlight"><span className="ais-Highlight-nonHighlighted">Semantic score: {hit._rankingScore}</span></span>
        </div>
        <div className="hit-content">
          <div className="hit-content-texts">
            <b>Summary:</b>&nbsp;
            <Snippet attribute="summary" hit={hit} />
          </div>
          <div className="hit-content-texts">
            <b>Eligibility Criteria:</b>&nbsp;
            <Snippet attribute="eligibility_criteria" hit={hit} />
          </div>
          <div className="hit-content-texts">
            <b>Primary Outcomes:</b>&nbsp;
            <Snippet attribute="primary_outcomes" hit={hit} />
          </div>
          <div className="hit-content-texts">
            <b>Secondary Outcomes:</b>&nbsp;
            <Snippet attribute="secondary_outcomes" hit={hit} />
          </div>
          <div className="hit-content-texts">
            <b>Interventions:</b>&nbsp;
            <Snippet attribute="interventions" hit={hit} />
          </div>
          <div className="hit-content-texts">
            <b>Intervention types:</b>&nbsp;
            <Snippet attribute="intervention_types" hit={hit} />
          </div>
        </div>
      </div>
    </>
  );
}
