import React from "react";
import { Filter } from "./Filtering";
import { filterButtonStyles } from "./styles";

const FilterByAttackBuffed = ({ apply, isApplied }) => (
  <Filter
    name="attack-buffed-crabs"
    transformation={(crab) => crab.isAttackBuffed}
    apply={apply}
    isApplied={isApplied}
  >
    {(isApplied, applyFilter) => {
      return (
        <button style={filterButtonStyles} onClick={applyFilter}>
          {isApplied ? "✔️" : "❌"} attack buffed crabs
        </button>
      );
    }}
  </Filter>
);

export default FilterByAttackBuffed;
