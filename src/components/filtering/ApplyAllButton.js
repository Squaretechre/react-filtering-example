import React from "react";
import { CheckMarkButtonEmoji } from "../emojis/Emoji";
import "./styles.css";

const ApplyAllButton = ({ applyAll }) => {
  return (
    <button className="filterButton" onClick={applyAll}>
      <CheckMarkButtonEmoji />
      Apply all
    </button>
  );
};

export default ApplyAllButton;
