import React, { useState } from "react";
import { CrabEmoji } from "./components/emojis/Emoji";

import { Filtering, Filter } from "./components/filtering/Filtering";
import { Sorting } from "./components/sorting/Sorting";

import SortByDefaultOrdering, {
  sortByDefaultOrderingConfig,
  withDefaultSortOrdering
} from "./components/sorting/SortByDefaultOrdering";

import SortByNameAlphabetically from "./components/sorting/SortByNameAlphabetically";
import SortByShellColour from "./components/sorting/SortByShellColour";
import SortByStrengthAscending from "./components/sorting/SortByStrengthAscending";
import SortByStrengthDescending from "./components/sorting/SortByStrengthDescending";

import FilterByName from "./components/filtering/FilterByName";
import FilterByRedShell from "./components/filtering/FilterByRedShell";
import FilterByYellowShell from "./components/filtering/FilterByYellowShell";
import FilterByWeak from "./components/filtering/FilterByWeak";
import FilterByStrong from "./components/filtering/FilterByStrong";
import FilterByAttackBuffed from "./components/filtering/FilterByAttackBuffed";
import RemoveAllButton from "./components/filtering/RemoveAllButton";
import ApplyFiltersButton from "./components/filtering/ApplyFiltersButton";
import ResetSelectionButton from "./components/filtering/ResetSelectionButton";
import FilterButton from "./components/filtering/FilterButton";

import CrabRow from "./components/crab-row/CrabRow";

import crabs from "./data/crabs";

import "./styles.css";

const uniqueItems = () => {
  const items = crabs.reduce((items, crab) => [...items, ...crab.items], []);
  return [...new Set(items)];
};

const crabsWithDefaultOrdering = withDefaultSortOrdering(crabs);

const initiallyAppliedFilters = {
  redCrabs: "redCrabs",
  strongCrabs: "strongCrabs",
  crabSearch: "crabSearch"
};

export default function App() {
  const [filteredCrabs, setFilteredCrabs] = useState(crabsWithDefaultOrdering);
  const [currentSorting, setCurrentSorting] = useState(
    sortByDefaultOrderingConfig
  );
  const [crabNameFilterSearchTerm, setCrabNameFilterSearchTerm] = useState(
    "flex"
  );

  return (
    <div className="App">
      <div className="filteringAndSorting">
        <h1>
          <CrabEmoji />
          Filter & Sort
          <CrabEmoji />
        </h1>

        <h2>Sorting</h2>

        <Sorting
          currentSorting={currentSorting}
          setCurrentSorting={setCurrentSorting}
        >
          {(props) => {
            return (
              <>
                <SortByDefaultOrdering {...props} />
                <SortByNameAlphabetically {...props} />
                <SortByShellColour {...props} />
                <SortByStrengthAscending {...props} />
                <SortByStrengthDescending {...props} />
              </>
            );
          }}
        </Sorting>

        <h2>Filtering</h2>

        <Filtering
          initiallyAppliedFilters={initiallyAppliedFilters}
          originalData={crabsWithDefaultOrdering}
          setFilteredData={setFilteredCrabs}
          onRemoveAll={[() => setCrabNameFilterSearchTerm("")]}
          applyTogether
        >
          {(props) => {
            return (
              <>
                <FilterByName
                  name={initiallyAppliedFilters.crabSearch}
                  currentSearchTerm={crabNameFilterSearchTerm}
                  setCurrentSearchTerm={setCrabNameFilterSearchTerm}
                  {...props}
                />
                <div className="filters">
                  <FilterByRedShell
                    name={initiallyAppliedFilters.redCrabs}
                    {...props}
                  />
                  <FilterByYellowShell {...props} />
                  <FilterByStrong
                    name={initiallyAppliedFilters.strongCrabs}
                    {...props}
                  />
                  <FilterByWeak {...props} />
                  <FilterByAttackBuffed {...props} />
                  {uniqueItems().map((item) => {
                    return (
                      <Filter
                        group="items"
                        condition={(crab) => crab.items.includes(item)}
                        {...props}
                      >
                        {(props) => {
                          return (
                            <FilterButton {...props}>has {item}</FilterButton>
                          );
                        }}
                      </Filter>
                    );
                  })}
                </div>
                <div className="filterControls">
                  {props.applyTogether && <ApplyFiltersButton {...props} />}
                  {props.applyTogether && <ResetSelectionButton {...props} />}
                  <RemoveAllButton {...props} />
                </div>
              </>
            );
          }}
        </Filtering>
      </div>

      <div className="crabList">
        {filteredCrabs.sort(currentSorting.func).map((crab, i) => (
          <CrabRow key={`crab-${i}`} crab={crab} />
        ))}
      </div>
    </div>
  );
}
