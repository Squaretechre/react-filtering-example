import React from "react";
import { Sort, sortNumericallyAscendingBy } from "./Sorting";
import { filterButtonStyles } from "./styles";

const name = "by-default-ordering";

export const sortByDefaultOrderingConfig = {
  name,
  func: sortNumericallyAscendingBy("sortOrderId")
};

export const withDefaultSortOrdering = (data) => {
  return data.map((item, sortOrderId) => {
    return {
      ...item,
      sortOrderId
    };
  });
};

const SortByDefaultOrdering = ({ apply, isApplied }) => {
  return (
    <Sort
      name={sortByDefaultOrderingConfig.name}
      sorting={sortByDefaultOrderingConfig.func}
      apply={apply}
      isApplied={isApplied}
    >
      {(isApplied, applySorting) => {
        return (
          <button style={filterButtonStyles} onClick={applySorting}>
            {isApplied ? "✔️" : "❌"} by default ordering
          </button>
        );
      }}
    </Sort>
  );
};

export default SortByDefaultOrdering;
