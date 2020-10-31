import React from "react";

const Emoji = ({ emoji, ariaLabel, ...props }) => (
  <span role="img" aria-label={ariaLabel} {...props}>
    {emoji}
  </span>
);

export const CrabEmoji = ({ ...props }) => (
  <Emoji emoji="🦀" ariaLabel="crab" {...props} />
);

export const WasteBasketEmoji = () => (
  <Emoji emoji="🗑️" ariaLabel="waste basket" />
);

export const CheckMarkEmoji = () => <Emoji emoji="✔️" ariaLabel="check mark" />;

export const CheckMarkButtonEmoji = () => (
  <Emoji emoji="✅" ariaLabel="check mark button" />
);

export const CrossMarkEmoji = () => <Emoji emoji="❌" ariaLabel="cross mark" />;

export const MagnifyingGlassTiltedLeftEmoji = ({ ...props }) => (
  <Emoji emoji="🔍" ariaLabel="magnifying glass tilted left" {...props} />
);
