import { useState } from "react";

export const Filters = ({
  getOriginalDataSet,
  setFilteredDataSet,
  onRemoveAll,
  children
}) => {
  const [filters, setFilters] = useState([]);
  const [removeCallbacks, setRemoveCallbacks] = useState({});

  const registerRemoveCallback = (filterName, callback) => {
    if (removeCallbacks[filterName]) return;

    let updatedRemoveCallbacks = {
      ...removeCallbacks,
      [filterName]: callback
    };

    setRemoveCallbacks(updatedRemoveCallbacks);
  };

  const removeAll = () => {
    const removedFilters = {
      ...filters
    };

    Object.keys(removedFilters).forEach((filterName) => {
      removedFilters[filterName].isApplied = false;
    });

    setFilteredDataSet(getOriginalDataSet);
    setFilters(removedFilters);

    onRemoveAll.forEach((callback) => callback());
  };

  const alwaysApply = (name, transformation) => {
    return apply(name, transformation, true);
  };

  const apply = (name, transformation, isAlwaysApplied = false) => {
    let updatedFilters = {
      ...filters
    };

    if (!isAlwaysApplied && isFilterCurrentlyApplied(name)) {
      updatedFilters = {
        ...filters,
        [name]: {
          isApplied: false
        }
      };
    } else {
      updatedFilters = {
        ...filters,
        [name]: {
          isApplied: true,
          transformation
        }
      };
    }

    const appliedFilters = Object.keys(updatedFilters)
      .map((key) =>
        updatedFilters[key].isApplied ? updatedFilters[key] : undefined
      )
      .filter((object) => object !== undefined);

    let filteredDataSet = getOriginalDataSet;

    Object.keys(appliedFilters).forEach((filterName) => {
      const filterToApply = appliedFilters[filterName];
      filteredDataSet = filteredDataSet.filter(filterToApply.transformation);
    });

    setFilteredDataSet(filteredDataSet);
    setFilters(updatedFilters);
  };

  const isFilterCurrentlyApplied = (name) => {
    return filters[name] ? filters[name].isApplied : false;
  };

  return children({
    apply,
    alwaysApply,
    isApplied: isFilterCurrentlyApplied,
    registerRemoveCallback,
    removeAll
  });
};

export const Filter = ({
  transformation,
  name,
  apply,
  isApplied,
  children
}) => {
  const applyFilter = () => {
    apply(name, transformation);
  };

  return children(isApplied(name), applyFilter);
};

Filter.defaultProps = {
  isApplied: () => true
};
