import React from "react";
import { searchClient, SearchClientOptions } from "./searchClient";
import { CurrentRefinements, InstantSearch, Menu, Pagination, SearchBox, Stats } from "react-instantsearch";
import { Panel } from "./Panel";
import { SCEHits } from "./SCEHits";

export type SearchProps = {
  indexName: string,
  searchToken: string,
  searchUrl: string
};

export function SCESearch({ indexName, options, searchUrl, searchToken }: SearchProps & { options: SearchClientOptions }) {
  return (
    <InstantSearch indexName={indexName} routing={true} searchClient={searchClient(searchUrl, searchToken, options)}>
      <div className="faceted_search--container">
        <div className="faceted_search--filters">
          <Panel header="Organization">
            <Menu attribute="organization_name" />
          </Panel>
          <Panel header="Phases">
            <Menu attribute="phases" />
          </Panel>
          <Panel header="Conditions">
            <Menu attribute="conditions" />
          </Panel>
          <Panel header="Lead Sponsor">
            <Menu attribute="lead_sponsor" />
          </Panel>
        </div>
        <div className="faceted_search--search">
          <SearchBox placeholder="Search" submitIconComponent={() => null} />
          <Stats />
          <CurrentRefinements />
          <SCEHits />
          <Pagination />
        </div>
      </div>
    </InstantSearch>
  );
}
