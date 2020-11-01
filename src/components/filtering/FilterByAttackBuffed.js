import React from "react";
import { Filter } from "./Filtering";
import FilterButton from "./FilterButton";

const FilterByAttackBuffed = ({ ...props }) => (
  <Filter
    name="attack-buffed-crabs"
    transformation={(crab) => crab.isAttackBuffed}
    {...props}
  >
    {(props) => {
      return <FilterButton {...props}>attack buffed crabs</FilterButton>;
    }}
  </Filter>
);

export default FilterByAttackBuffed;
