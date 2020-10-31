import React from "react";
import { Filter } from "./Filtering";
import "./styles.css";

const FilterByStrong = ({ apply, isApplied }) => (
  <Filter
    name="strong-crabs"
    transformation={(crab) => crab.strength > 50}
    apply={apply}
    isApplied={isApplied}
  >
    {(isApplied, applyFilter) => {
      return (
        <button className="filterButton" onClick={applyFilter}>
          {isApplied ? "✔️" : "❌"} strong crabs
        </button>
      );
    }}
  </Filter>
);

export default FilterByStrong;
