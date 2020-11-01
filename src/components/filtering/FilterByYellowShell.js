import React from "react";
import { Filter } from "./Filtering";
import FilterButton from "./FilterButton";

const FilterByYellowShell = ({ ...props }) => (
  <Filter transformation={(crab) => crab.shellColour === "yellow"} {...props}>
    {(props) => {
      return <FilterButton {...props}>yellow crabs</FilterButton>;
    }}
  </Filter>
);

export default FilterByYellowShell;
