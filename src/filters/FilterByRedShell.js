import React from "react";
import { Filter } from "../Filters";
import { filterButtonStyles } from "./styles";

const FilterByRedShell = ({ apply, isApplied }) => (
  <Filter
    name="red-crabs"
    transformation={(crab) => crab.shellColour === "red"}
    apply={apply}
    isApplied={isApplied}
  >
    {(isApplied, applyFilter) => {
      return (
        <button style={filterButtonStyles} onClick={applyFilter}>
          {isApplied ? "✔️" : "❌"} red crabs
        </button>
      );
    }}
  </Filter>
);

export default FilterByRedShell;
