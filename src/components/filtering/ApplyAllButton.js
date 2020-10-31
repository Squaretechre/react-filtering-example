/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import "./styles.css";

const ApplyAllButton = ({ applyAll }) => {
  return (
    <button className="removeAllButton" onClick={applyAll}>
      ✅ Apply all
    </button>
  );
};

export default ApplyAllButton;
