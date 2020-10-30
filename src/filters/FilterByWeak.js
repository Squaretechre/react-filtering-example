import React from "react";
import { Filter } from "../Filters";
import { filterButtonStyles } from "./styles";

const FilterByWeak = ({ apply, isApplied }) => (
  <Filter
    name="weak-crabs"
    transformation={(crab) => crab.defence < 50}
    apply={apply}
    isApplied={isApplied}
  >
    {(isApplied, applyFilter) => {
      return (
        <button style={filterButtonStyles} onClick={applyFilter}>
          {isApplied ? "✔️" : "❌"} weak crabs
        </button>
      );
    }}
  </Filter>
);

export default FilterByWeak;
