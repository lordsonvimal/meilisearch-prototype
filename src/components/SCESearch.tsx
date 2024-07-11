import React from "react";
import { searchClient } from "./searchClient";
import { Configure, CurrentRefinements, InstantSearch, Menu, Pagination, SearchBox, Stats } from "react-instantsearch";
import { Panel } from "./Panel";
import { SCEHits } from "./SCEHits";

export type SearchProps = {
  indexName: string,
  searchToken: string,
  searchUrl: string
};

export function SCESearch({ indexName, searchUrl, searchToken }: SearchProps) {
  return (
    <InstantSearch indexName={indexName} routing={true} searchClient={searchClient(searchUrl, searchToken)}>
      {/* <Configure attributeToHighlight={["*"]} attributesToRetrieve={["folder_id", "id"]} attributesToSnippet={["content"]} /> */}
      <Configure index="" />
      <div className="faceted_search--container">
        <div className="faceted_search--filters">
          <Panel header="Library">
            <Menu attribute="library" />
          </Panel>
          <Panel header="Project">
            <Menu attribute="project" />
          </Panel>
          <Panel header="Study">
            <Menu attribute="study" />
          </Panel>
          <Panel header="Extension">
            <Menu attribute="extension" />
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
