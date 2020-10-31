/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import "./styles.css";

const RemoveAllButton = ({ removeAll }) => {
  return (
    <button className="removeAllButton" onClick={removeAll}>
      🗑️ Remove all filters
    </button>
  );
};

export default RemoveAllButton;
