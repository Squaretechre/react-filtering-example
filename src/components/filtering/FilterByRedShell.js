import React from "react";
import { Filter } from "./Filtering";
import FilterButton from "./FilterButton";

const FilterByRedShell = ({ ...props }) => (
  <Filter
    name="red-crabs"
    transformation={(crab) => crab.shellColour === "red"}
    {...props}
  >
    {(isApplied, isSelected, applyFilter, applyTogether) => {
      return (
        <FilterButton
          isApplied={isApplied}
          isSelected={isSelected}
          applyFilter={applyFilter}
          applyTogether={applyTogether}
        >
          red crabs
        </FilterButton>
      );
    }}
  </Filter>
);

export default FilterByRedShell;
