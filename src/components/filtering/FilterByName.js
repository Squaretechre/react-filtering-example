import React, { useState, useRef } from "react";
import { Filter } from "./Filtering";
import { MagnifyingGlassTiltedLeftEmoji } from "../emojis/Emoji";
import "./styles.css";

const FilterByName = ({
  alwaysApply,
  applyFilter,
  currentSearchTerm,
  setCurrentSearchTerm,
  ...props
}) => {
  const searchTermElement = useRef(null);
  return (
    <Filter
      alwaysApply
      condition={(crab) =>
        crab.name.toLowerCase().includes(searchTermElement.current.value)
      }
      {...props}
    >
      {({ applyFilter }) => {
        return (
          <div className="filterByName">
            <MagnifyingGlassTiltedLeftEmoji className="filterByName__icon" />
            <input
              ref={searchTermElement}
              type="text"
              value={currentSearchTerm}
              placeholder="Filter by crab name..."
              onChange={(event) => {
                setCurrentSearchTerm(event.target.value);
                applyFilter();
              }}
            />
          </div>
        );
      }}
    </Filter>
  );
};

export default FilterByName;
