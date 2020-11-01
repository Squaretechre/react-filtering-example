import React from "react";
import { Filter } from "./Filtering";
import FilterButton from "./FilterButton";
const FilterByStrong = ({ ...props }) => (
  <Filter
    name="strong-crabs"
    transformation={(crab) => crab.strength > 50}
    {...props}
  >
    {(props) => {
      return <FilterButton {...props}>strong crabs</FilterButton>;
    }}
  </Filter>
);

export default FilterByStrong;
