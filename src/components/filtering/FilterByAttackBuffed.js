import React from "react";
import { Filter } from "./Filtering";
import FilterButton from "./FilterButton";

const FilterByAttackBuffed = ({ ...props }) => (
  <Filter
    name="attack-buffed-crabs"
    transformation={(crab) => crab.isAttackBuffed}
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
          attack buffed crabs
        </FilterButton>
      );
    }}
  </Filter>
);

export default FilterByAttackBuffed;
