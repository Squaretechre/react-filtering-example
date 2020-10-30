import React from "react";
import { Filter } from "../Filters";

const FilterByName = ({
  alwaysApply,
  currentSearchTerm,
  setCurrentSearchTerm
}) => {
  return (
    <Filter>
      {() => {
        return (
          <input
            type="text"
            value={currentSearchTerm}
            placeholder="Filter by crab name..."
            onChange={(event) => {
              const searchTerm = event.target.value.toLowerCase();

              alwaysApply("search-crab-name", (crab) => {
                return crab.name.toLowerCase().includes(searchTerm);
              });

              setCurrentSearchTerm(event.target.value);
            }}
          />
        );
      }}
    </Filter>
  );
};

export default FilterByName;
