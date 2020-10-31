/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { removeAllButtonStyles } from "./styles";

const RemoveAllButton = ({ removeAll }) => {
  return (
    <button style={removeAllButtonStyles} onClick={removeAll}>
      🗑️ Remove all filters
    </button>
  );
};

export default RemoveAllButton;
