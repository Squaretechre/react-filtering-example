import React from "react";
import { Filter } from "./Filtering";
import FilterButton from "./FilterButton";

const FilterByWeak = ({ ...props }) => (
  <Filter
    name="weak-crabs"
    transformation={(crab) => crab.defence < 50}
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
          weak crabs
        </FilterButton>
      );
    }}
  </Filter>
);

export default FilterByWeak;
