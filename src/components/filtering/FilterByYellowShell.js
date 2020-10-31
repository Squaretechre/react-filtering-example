import React from "react";
import { Filter } from "./Filtering";
import FilterButton from "./FilterButton";

const FilterByYellowShell = ({ ...props }) => (
  <Filter
    name="yellow-crabs"
    transformation={(crab) => crab.shellColour === "yellow"}
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
          yellow crabs
        </FilterButton>
      );
    }}
  </Filter>
);

export default FilterByYellowShell;
