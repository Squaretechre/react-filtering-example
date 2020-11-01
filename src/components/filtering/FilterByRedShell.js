import React from "react";
import { Filter } from "./Filtering";
import FilterButton from "./FilterButton";

const FilterByRedShell = ({ ...props }) => (
  <Filter transformation={(crab) => crab.shellColour === "red"} {...props}>
    {(props) => {
      return <FilterButton {...props}>red crabs</FilterButton>;
    }}
  </Filter>
);

export default FilterByRedShell;
