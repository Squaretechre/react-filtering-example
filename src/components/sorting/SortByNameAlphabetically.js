import React from "react";
import { Sort, sortAlphabeticallyBy } from "./Sorting";
import { CheckMarkEmoji, CrossMarkEmoji } from "../emojis/Emoji";
import "./styles.css";

const SortByNameAlphabetically = ({ apply, isApplied }) => {
  return (
    <Sort
      name={"by-name-alphabetically"}
      sorting={sortAlphabeticallyBy("name")}
      apply={apply}
      isApplied={isApplied}
    >
      {(isApplied, applySorting) => {
        return (
          <button className="sortButton" onClick={applySorting}>
            {isApplied ? <CheckMarkEmoji /> : <CrossMarkEmoji />} by name
          </button>
        );
      }}
    </Sort>
  );
};

export default SortByNameAlphabetically;
