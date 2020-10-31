/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState } from "react";
import { Filtering } from "./components/filtering/Filtering";
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
import FilterByWeak from "./components/filtering/FilterByWeak";
import FilterByStrong from "./components/filtering/FilterByStrong";
import FilterByAttackBuffed from "./components/filtering/FilterByAttackBuffed";
import RemoveAllButton from "./components/filtering/RemoveAllButton";

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
