import React from "react";
import { WasteBasketEmoji } from "../emojis/Emoji";
import "./styles.css";

const RemoveAllButton = ({ removeAll }) => {
  return (
    <button onClick={removeAll}>
      <WasteBasketEmoji />
      Remove all filters
    </button>
  );
};

export default RemoveAllButton;
