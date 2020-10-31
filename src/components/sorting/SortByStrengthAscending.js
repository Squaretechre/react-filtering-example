import React from "react";
import { Sort, sortNumericallyAscendingBy } from "./Sorting";
import "./styles.css";

const SortByStrengthAscending = ({ apply, isApplied }) => {
  return (
    <Sort
      name="by-strength-ascending"
      sorting={sortNumericallyAscendingBy("strength")}
      apply={apply}
      isApplied={isApplied}
    >
      {(isApplied, applySorting) => {
        return (
          <button className="sortButton" onClick={applySorting}>
            {isApplied ? "✔️" : "❌"} by strength asc
          </button>
        );
      }}
    </Sort>
  );
};

export default SortByStrengthAscending;
