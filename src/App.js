/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState } from "react";
import { Filtering } from "./filtering/Filtering";
import { Sorting } from "./sorting/Sorting";

import SortByDefaultOrdering, {
  sortByDefaultOrderingConfig,
  withDefaultSortOrdering
} from "./sorting/SortByDefaultOrdering";

import SortByNameAlphabetically from "./sorting/SortByNameAlphabetically";
import SortByShellColour from "./sorting/SortByShellColour";
import SortByStrengthAscending from "./sorting/SortByStrengthAscending";
import SortByStrengthDescending from "./sorting/SortByStrengthDescending";

import FilterByName from "./filtering/FilterByName";
import FilterByRedShell from "./filtering/FilterByRedShell";
import FilterByWeak from "./filtering/FilterByWeak";
import FilterByStrong from "./filtering/FilterByStrong";
import FilterByAttackBuffed from "./filtering/FilterByAttackBuffed";
import RemoveAllButton from "./filtering/RemoveAllButton";

import crabs from "./data/crabs";

import "./styles.css";

const crabsWithDefaultOrdering = withDefaultSortOrdering(crabs);

export default function App() {
  const [filteredCrabs, setFilteredCrabs] = useState(crabsWithDefaultOrdering);
  const [currentSorting, setCurrentSorting] = useState(
    sortByDefaultOrderingConfig
  );
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");

  return (
    <div className="App">
      <h1>🦀 Filter & Sort Those Crabs 🦀</h1>

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
        getOriginalDataSet={crabsWithDefaultOrdering}
        setFilteredDataSet={setFilteredCrabs}
        onRemoveAll={[() => setCurrentSearchTerm("")]}
      >
        {(props) => {
          return (
            <>
              <RemoveAllButton {...props} />
              <FilterByName
                currentSearchTerm={currentSearchTerm}
                setCurrentSearchTerm={setCurrentSearchTerm}
                {...props}
              />
              <FilterByRedShell {...props} />
              <FilterByStrong {...props} />
              <FilterByWeak {...props} />
              <FilterByAttackBuffed {...props} />
            </>
          );
        }}
      </Filtering>

      {filteredCrabs.sort(currentSorting.func).map((crab) => (
        <div key={crab.name}>
          <p style={{ fontWeight: 600 }}>{crab.name}</p>
          <pre>{JSON.stringify(crab, null, 4)}</pre>
        </div>
      ))}
    </div>
  );
}
