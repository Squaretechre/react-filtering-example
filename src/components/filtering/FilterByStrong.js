import React from "react";
import { Filter } from "./Filtering";
import FilterButton from "./FilterButton";
const FilterByStrong = ({ ...props }) => (
  <Filter
    name="strong-crabs"
    transformation={(crab) => crab.strength > 50}
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
          strong crabs
        </FilterButton>
      );
    }}
  </Filter>
);

export default FilterByStrong;
