import React from "react";
import { Sort, sortNumericallyDescendingBy } from "./Sorting";
import { CheckMarkEmoji, CrossMarkEmoji } from "../emojis/Emoji";
import "./styles.css";

const SortByStrengthDescending = ({ apply, isApplied }) => {
  return (
    <Sort
      name="by-strength-descending"
      sorting={sortNumericallyDescendingBy("strength")}
      apply={apply}
      isApplied={isApplied}
    >
      {(isApplied, applySorting) => {
        return (
          <button className="sortButton" onClick={applySorting}>
            {isApplied ? <CheckMarkEmoji /> : <CrossMarkEmoji />} by strength
            desc
          </button>
        );
      }}
    </Sort>
  );
};

export default SortByStrengthDescending;
