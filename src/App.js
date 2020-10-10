import React, { useState } from "react";
import { Filters, Filter } from "./Filters";
import {
  Sorting,
  Sort,
  sortByShellColour,
  sortByNameAlphabetically
} from "./Sorting";
import crabs from "./crabs";
import { removeAllButtonStyles, filterButtonStyles } from "./styles";
import "./styles.css";

export default function App() {
  const [currentSorting, setCurrentSorting] = useState({
    name: "by-name-alphabetically",
    func: sortByNameAlphabetically
  });
  const [filteredCrabs, setFilteredCrabs] = useState(crabs);

  return (
    <div className="App">
      <h1>🦀 Filter Those Crabs 🦀</h1>
      <h2>Sorting</h2>
      <Sorting
        currentSorting={currentSorting}
        setCurrentSorting={setCurrentSorting}
      >
        {(apply, isApplied) => {
          return (
            <>
              <Sort
                name="by-name-alphabetically"
                sorting={sortByNameAlphabetically}
                apply={apply}
                isApplied={isApplied}
              >
                {(isApplied, applySorting) => {
                  return (
                    <button style={filterButtonStyles} onClick={applySorting}>
                      {isApplied ? "✔️" : "❌"} by name
                    </button>
                  );
                }}
              </Sort>
              <Sort
                name="by-shell-colour"
                sorting={sortByShellColour}
                apply={apply}
                isApplied={isApplied}
              >
                {(isApplied, applySorting) => {
                  return (
                    <button style={filterButtonStyles} onClick={applySorting}>
                      {isApplied ? "✔️" : "❌"} by shell colour
                    </button>
                  );
                }}
              </Sort>
            </>
          );
        }}
      </Sorting>

      <h2>Filtering</h2>
      <Filters getOriginalDataSet={crabs} setFilteredDataSet={setFilteredCrabs}>
        {(apply, isApplied, removeAll) => {
          return (
            <>
              <button style={removeAllButtonStyles} onClick={() => removeAll()}>
                🗑️ Remove all filters
              </button>
              <Filter
                name="red-crabs"
                transformation={(crab) => crab.shellColour === "red"}
                apply={apply}
                isApplied={isApplied}
              >
                {(isApplied, applyFilter) => {
                  return (
                    <button style={filterButtonStyles} onClick={applyFilter}>
                      {isApplied ? "✔️ red crabs" : "❌ red crabs"}
                    </button>
                  );
                }}
              </Filter>
              <Filter
                name="strong-crabs"
                transformation={(crab) => crab.strength > 50}
                apply={apply}
                isApplied={isApplied}
              >
                {(isApplied, applyFilter) => {
                  return (
                    <button style={filterButtonStyles} onClick={applyFilter}>
                      {isApplied ? "✔️ strong crabs" : "❌ strong crabs"}
                    </button>
                  );
                }}
              </Filter>
              <Filter
                name="weak-crabs"
                transformation={(crab) => crab.defence < 50}
                apply={apply}
                isApplied={isApplied}
              >
                {(isApplied, applyFilter) => {
                  return (
                    <button style={filterButtonStyles} onClick={applyFilter}>
                      {isApplied ? "✔️ weak crabs" : "❌ weak crabs"}
                    </button>
                  );
                }}
              </Filter>
              <Filter
                name="attack-buffed-crabs"
                transformation={(crab) => crab.isAttackBuffed}
                apply={apply}
                isApplied={isApplied}
              >
                {(isApplied, applyFilter) => {
                  return (
                    <button style={filterButtonStyles} onClick={applyFilter}>
                      {isApplied
                        ? "✔️ attack buffed crabs"
                        : "❌ attack buffed crabs"}
                    </button>
                  );
                }}
              </Filter>
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
