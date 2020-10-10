import { useState } from "react";

export const Sorting = ({ currentSorting, setCurrentSorting, children }) => {
  const [currentSortingFunction, setCurrentSortingFunction] = useState(
    currentSorting
  );

  const apply = (name, func) => {
    let nextSorting = {
      name,
      func
    };

    if (isApplied(name)) {
      return;
    }

    setCurrentSortingFunction(nextSorting);
    setCurrentSorting(() => nextSorting);
  };

  const isApplied = (name) => {
    return currentSortingFunction === undefined
      ? false
      : currentSortingFunction.name === name;
  };

  return children(apply, isApplied);
};

export const Sort = ({ sorting, name, apply, isApplied, children }) => {
  const applySorting = () => {
    apply(name, sorting);
  };

  return children(isApplied(name), applySorting);
};

export const sortByShellColour = (a, b) => {
  var shellColourA = a.shellColour.toUpperCase();
  var shellColourB = b.shellColour.toUpperCase();
  if (shellColourA < shellColourB) {
    return -1;
  }
  if (shellColourA > shellColourB) {
    return 1;
  }

  return 0;
};

export const sortByNameAlphabetically = (a, b) => {
  var nameA = a.name.toUpperCase();
  var nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
};
