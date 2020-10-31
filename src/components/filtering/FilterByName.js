import React from "react";
import { Filter } from "./Filtering";
import { MagnifyingGlassTiltedLeftEmoji } from "../emojis/Emoji";
import "./styles.css";

const FilterByName = ({
  alwaysApply,
  currentSearchTerm,
  setCurrentSearchTerm,
  ...props
}) => {
  return (
    <Filter {...props}>
      {() => {
        return (
          <div className="filterByName">
            <MagnifyingGlassTiltedLeftEmoji className="filterByName__icon" />
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
          </div>
        );
      }}
    </Filter>
  );
};

export default FilterByName;
