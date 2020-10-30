import React from "react";
import { Sort, sortNumericallyDescendingBy } from "../Sorting";
import { filterButtonStyles } from "./styles";

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
          <button style={filterButtonStyles} onClick={applySorting}>
            {isApplied ? "✔️" : "❌"} by strength desc
          </button>
        );
      }}
    </Sort>
  );
};

export default SortByStrengthDescending;
