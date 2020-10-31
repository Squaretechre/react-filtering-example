import React from "react";
import { Sort, sortAlphabeticallyBy } from "./Sorting";
import "./styles.css";

const SortByShellColour = ({ apply, isApplied }) => {
  return (
    <Sort
      name="by-shell-colour"
      sorting={sortAlphabeticallyBy("shellColour")}
      apply={apply}
      isApplied={isApplied}
    >
      {(isApplied, applySorting) => {
        return (
          <button className="sortButton" onClick={applySorting}>
            {isApplied ? "✔️" : "❌"} by shell colour
          </button>
        );
      }}
    </Sort>
  );
};

export default SortByShellColour;
