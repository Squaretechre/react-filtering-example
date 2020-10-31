import React from "react";
import { Filter } from "./Filtering";
import { CheckMarkEmoji, CrossMarkEmoji } from "../emojis/Emoji";
import "./styles.css";

const FilterByYellowShell = ({ apply, isApplied }) => (
  <Filter
    name="yellow-crabs"
    transformation={(crab) => crab.shellColour === "yellow"}
    apply={apply}
    isApplied={isApplied}
  >
    {(isApplied, applyFilter) => {
      return (
        <button className="filterButton" onClick={applyFilter}>
          {isApplied ? <CheckMarkEmoji /> : <CrossMarkEmoji />} yellow crabs
        </button>
      );
    }}
  </Filter>
);

export default FilterByYellowShell;
