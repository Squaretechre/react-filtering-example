import React from "react";
import { Filter } from "./Filtering";
import "./styles.css";

const FilterByWeak = ({ apply, isApplied }) => (
  <Filter
    name="weak-crabs"
    transformation={(crab) => crab.defence < 50}
    apply={apply}
    isApplied={isApplied}
  >
    {(isApplied, applyFilter) => {
      return (
        <button className="filterButton" onClick={applyFilter}>
          {isApplied ? "✔️" : "❌"} weak crabs
        </button>
      );
    }}
  </Filter>
);

export default FilterByWeak;
