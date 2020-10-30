import React from "react";
import { Sort, sortAlphabeticallyBy } from "../Sorting";
import { filterButtonStyles } from "./styles";

const name = "by-name-alphabetically";

export const sortByNameAlphabeticallyConfig = {
  name,
  func: sortAlphabeticallyBy("name")
};

const SortByNameAlphabetically = ({ apply, isApplied }) => {
  return (
    <Sort
      name={sortByNameAlphabeticallyConfig.name}
      sorting={sortByNameAlphabeticallyConfig.func}
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
