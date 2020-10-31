import React from "react";
import { CheckMarkButtonEmoji } from "../emojis/Emoji";
import "./styles.css";

const ApplyFilters = ({ applySelected }) => {
  return (
    <button className="filterButton" onClick={applySelected}>
      <CheckMarkButtonEmoji />
      Apply filters
    </button>
  );
};

export default ApplyFilters;
