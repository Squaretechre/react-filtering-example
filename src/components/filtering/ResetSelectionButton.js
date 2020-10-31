import React from "react";
import { BroomEmoji } from "../emojis/Emoji";
import "./styles.css";

const ResetSelectionButton = ({ resetSelection }) => {
  return (
    <button className="filterButton" onClick={resetSelection}>
      <BroomEmoji />
      Reset selection
    </button>
  );
};

export default ResetSelectionButton;
