import React from "react";
import { Filter } from "./Filtering";
import "./styles.css";

const FilterByRedShell = ({ apply, isApplied }) => (
  <Filter
    name="red-crabs"
    transformation={(crab) => crab.shellColour === "red"}
    apply={apply}
    isApplied={isApplied}
  >
    {(isApplied, applyFilter) => {
      return (
        <button className="filterButton" onClick={applyFilter}>
          {isApplied ? "✔️" : "❌"} red crabs
        </button>
      );
    }}
  </Filter>
);

export default FilterByRedShell;
