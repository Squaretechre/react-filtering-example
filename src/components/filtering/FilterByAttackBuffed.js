import React from "react";
import { Filter } from "./Filtering";
import FilterButton from "./FilterButton";

const FilterByAttackBuffed = ({ ...props }) => (
  <Filter transformation={(crab) => crab.isAttackBuffed} {...props}>
    {(props) => {
      return <FilterButton {...props}>attack buffed crabs</FilterButton>;
    }}
  </Filter>
);

export default FilterByAttackBuffed;
