import React, { useState } from "react";
import { CrabEmoji } from "./components/emojis/Emoji";

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
import FilterByYellowShell from "./components/filtering/FilterByYellowShell";
import FilterByWeak from "./components/filtering/FilterByWeak";
import FilterByStrong from "./components/filtering/FilterByStrong";
import FilterByAttackBuffed from "./components/filtering/FilterByAttackBuffed";
import RemoveAllButton from "./components/filtering/RemoveAllButton";
import ApplyAllButton from "./components/filtering/ApplyAllButton";

import CrabRow from "./components/crab-row/CrabRow";

import crabs from "./data/crabs";

import "./styles.css";

const crabsWithDefaultOrdering = withDefaultSortOrdering(crabs);

export default function App() {
  const [filteredCrabs, setFilteredCrabs] = useState(crabsWithDefaultOrdering);
  const [currentSorting, setCurrentSorting] = useState(
    sortByDefaultOrderingConfig
  );
  const [crabNameFilterSearchTerm, setCrabNameFilterSearchTerm] = useState("");

  return (
    <div className="App">
      <div className="filteringAndSorting">
        <h1>
          <CrabEmoji /> Filter & Sort
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
          getOriginalDataSet={crabsWithDefaultOrdering}
          setFilteredDataSet={setFilteredCrabs}
          onRemoveAll={[() => setCrabNameFilterSearchTerm("")]}
          applyTogether
        >
          {(props) => {
            return (
              <>
                <FilterByName
                  currentSearchTerm={crabNameFilterSearchTerm}
                  setCurrentSearchTerm={setCrabNameFilterSearchTerm}
                  {...props}
                />
                <div className="filters">
                  <FilterByRedShell {...props} />
                  <FilterByYellowShell {...props} />
                  <FilterByStrong {...props} />
                  <FilterByWeak {...props} />
                  <FilterByAttackBuffed {...props} />
                </div>
                <div className="filterControls">
                  {props.applyTogether && <ApplyAllButton {...props} />}
                  <RemoveAllButton {...props} />
                </div>
              </>
            );
          }}
        </Filtering>
      </div>

      <div className="crabList">
        {filteredCrabs.sort(currentSorting.func).map((crab) => (
          <CrabRow crab={crab} />
        ))}
      </div>
    </div>
  );
}
