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

  return children({ apply, isApplied });
};

export const Sort = ({ sorting, name, apply, isApplied, children }) => {
  const applySorting = () => {
    apply(name, sorting);
  };

  return children(isApplied(name), applySorting);
};

export const sortNumericallyAscendingBy = (property) => {
  return (a, b) => a[property] - b[property];
};

export const sortNumericallyDescendingBy = (property) => {
  return (a, b) => b[property] - a[property];
};

export const sortAlphabeticallyBy = (property) => {
  return (a, b) => {
    var propertyA = a[property].toUpperCase();
    var propertyB = b[property].toUpperCase();
    if (propertyA < propertyB) {
      return -1;
    }
    if (propertyA > propertyB) {
      return 1;
    }
    return 0;
  };
};
