import React from "react";
import { Sort, sortAlphabeticallyBy } from "./Sorting";
import { filterButtonStyles } from "./styles";

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
          <button style={filterButtonStyles} onClick={applySorting}>
            {isApplied ? "✔️" : "❌"} by shell colour
          </button>
        );
      }}
    </Sort>
  );
};

export default SortByShellColour;
