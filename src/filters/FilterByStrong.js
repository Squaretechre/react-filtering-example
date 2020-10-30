import React from "react";
import { Filter } from "../Filters";
import { filterButtonStyles } from "./styles";

const FilterByStrong = ({ apply, isApplied }) => (
  <Filter
    name="strong-crabs"
    transformation={(crab) => crab.strength > 50}
    apply={apply}
    isApplied={isApplied}
  >
    {(isApplied, applyFilter) => {
      return (
        <button style={filterButtonStyles} onClick={applyFilter}>
          {isApplied ? "✔️" : "❌"} strong crabs
        </button>
      );
    }}
  </Filter>
);

export default FilterByStrong;
