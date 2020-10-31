import React from "react";

const Emoji = ({ emoji, ariaLabel }) => (
  <span role="img" aria-label={ariaLabel}>
    {emoji}
  </span>
);

export const CrabEmoji = () => <Emoji emoji="🦀" ariaLabel="crab" />;

export const WasteBasketEmoji = () => (
  <Emoji emoji="🗑️" ariaLabel="waste basket" />
);

export const CheckMarkEmoji = () => <Emoji emoji="✔️" ariaLabel="check mark" />;

export const CheckMarkButtonEmoji = () => (
  <Emoji emoji="✅" ariaLabel="check mark button" />
);

export const CrossMarkEmoji = () => <Emoji emoji="❌" ariaLabel="cross mark" />;

export const MagnifyingGlassTiltedLeftEmoji = () => (
  <Emoji emoji="🔍" ariaLabel="magnifying glass tilted left" />
);
