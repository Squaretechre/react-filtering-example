import React from "react";
import {
  CheckMarkEmoji,
  CrossMarkEmoji,
  GreenCircleEmoji,
  RedCircleEmoji
} from "../emojis/Emoji";

import "./styles.css";

const FilterButton = ({
  isApplied,
  isSelected,
  applyFilter,
  applyTogether,
  children
}) => {
  const Icon = () => {
    if (applyTogether && isSelected) return <GreenCircleEmoji />;
    if (applyTogether && !isSelected) return <RedCircleEmoji />;
    if (!applyTogether && isApplied) return <CheckMarkEmoji />;
    if (!applyTogether && !isApplied) return <CrossMarkEmoji />;
  };
  return (
    <button className="filterButton" onClick={applyFilter}>
      <Icon />
      {children}
    </button>
  );
};

export default FilterButton;
