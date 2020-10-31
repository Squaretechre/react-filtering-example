import React from "react";
import { Filter } from "./Filtering";
import { CheckMarkEmoji, CrossMarkEmoji } from "../emojis/Emoji";
import "./styles.css";

const FilterByRedShell = ({ apply, isApplied }) => (
  <Filter
    name="red-crabs"
    transformation={(crab) => crab.shellColour === "red"}
    apply={apply}
    isApplied={isApplied}
  >
    {(isApplied, applyFilter) => {
      return (
        <button className="filterButton" onClick={applyFilter}>
          {isApplied ? <CheckMarkEmoji /> : <CrossMarkEmoji />} red crabs
        </button>
      );
    }}
  </Filter>
);

export default FilterByRedShell;
