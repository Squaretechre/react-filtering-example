/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState } from "react";
import { Filters } from "./Filters";
import { Sorting, sortNumericallyAscendingBy } from "./Sorting";

import SortByNameAlphabetically, {
  sortByNameAlphabeticallyConfig
} from "./sorting/SortByNameAlphabetically";

import SortByShellColour from "./sorting/SortByShellColour";
import SortByStrengthAscending from "./sorting/SortByStrengthAscending";
import SortByStrengthDescending from "./sorting/SortByStrengthDescending";

import FilterByName from "./filters/FilterByName";
import FilterByRedShell from "./filters/FilterByRedShell";
import FilterByWeak from "./filters/FilterByWeak";
import FilterByStrong from "./filters/FilterByStrong";
import FilterByAttackBuffed from "./filters/FilterByAttackBuffed";
import RemoveAllButton from "./filters/RemoveAllButton";

import crabs from "./crabs";

import "./styles.css";

export default function App() {
  const [currentSorting, setCurrentSorting] = useState(
    sortByNameAlphabeticallyConfig
  );
  const [filteredCrabs, setFilteredCrabs] = useState(crabs);
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
              <SortByNameAlphabetically {...props} />
              <SortByShellColour {...props} />
              <SortByStrengthAscending {...props} />
              <SortByStrengthDescending {...props} />
            </>
          );
        }}
      </Sorting>

      <h2>Filtering</h2>

      <Filters
        getOriginalDataSet={crabs}
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
      </Filters>

      {filteredCrabs.sort(currentSorting.func).map((crab) => (
        <div key={crab.name}>
          <p style={{ fontWeight: 600 }}>{crab.name}</p>
          <pre>{JSON.stringify(crab, null, 4)}</pre>
        </div>
      ))}
    </div>
  );
}
