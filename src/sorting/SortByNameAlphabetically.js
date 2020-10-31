import React from "react";
import { Sort, sortAlphabeticallyBy } from "./Sorting";
import { filterButtonStyles } from "./styles";

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
          <button style={filterButtonStyles} onClick={applySorting}>
            {isApplied ? "✔️" : "❌"} by name
          </button>
        );
      }}
    </Sort>
  );
};

export default SortByNameAlphabetically;
