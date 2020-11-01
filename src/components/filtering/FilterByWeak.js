import React from "react";
import { Filter } from "./Filtering";
import FilterButton from "./FilterButton";

const FilterByWeak = ({ ...props }) => (
  <Filter condition={(crab) => crab.defence < 50} {...props}>
    {(props) => {
      return <FilterButton {...props}>weak crabs</FilterButton>;
    }}
  </Filter>
);

export default FilterByWeak;
