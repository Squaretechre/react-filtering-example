import React from "react";

const Emoji = ({ emoji, ariaLabel, ...props }) => (
  <span role="img" aria-label={ariaLabel} {...props}>
    {emoji}
  </span>
);

export const CrabEmoji = ({ ...props }) => (
  <Emoji emoji="🦀" ariaLabel="crab" {...props} />
);

export const BroomEmoji = ({ ...props }) => (
  <Emoji emoji="🧹" ariaLabel="broom" {...props} />
);

export const WasteBasketEmoji = () => (
  <Emoji emoji="🗑️" ariaLabel="waste basket" />
);

export const CheckMarkEmoji = () => <Emoji emoji="✔️" ariaLabel="check mark" />;

export const CheckMarkButtonEmoji = () => (
  <Emoji emoji="✅" ariaLabel="check mark button" />
);

export const GreenCircleEmoji = () => (
  <Emoji emoji="🟢" ariaLabel="green circle" />
);

export const RedCircleEmoji = () => <Emoji emoji="🔴" ariaLabel="red circle" />;

export const CrossMarkEmoji = () => <Emoji emoji="❌" ariaLabel="cross mark" />;

export const MagnifyingGlassTiltedLeftEmoji = ({ ...props }) => (
  <Emoji emoji="🔍" ariaLabel="magnifying glass tilted left" {...props} />
);
