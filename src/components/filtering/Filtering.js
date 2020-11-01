import { useState } from "react";

export const Filtering = ({
  originalData,
  setFilteredData,
  onRemoveAll,
  applyTogether,
  children
}) => {
  const [filters, setFilters] = useState([]);
  const [removeCallbacks, setRemoveCallbacks] = useState({});

  const registerRemoveCallback = (filterId, callback) => {
    if (removeCallbacks[filterId]) return;

    let updatedRemoveCallbacks = {
      ...removeCallbacks,
      [filterId]: callback
    };

    setRemoveCallbacks(updatedRemoveCallbacks);
  };

  const removeAll = () => {
    const removedFilters = {
      ...filters
    };

    Object.keys(removedFilters).forEach((filterId) => {
      removedFilters[filterId].isApplied = false;
      removedFilters[filterId].isSelected = false;
    });

    setFilteredData(originalData);
    setFilters(removedFilters);

    onRemoveAll.forEach((callback) => callback());
  };

  const filterDataWith = (filters) => {
    let filteredDataSet = originalData;

    Object.keys(filters).forEach((filterId) => {
      const filterToApply = filters[filterId];
      filteredDataSet = filteredDataSet.filter(filterToApply.condition);
    });

    setFilteredData(filteredDataSet);
  };

  const applySelected = () => {
    const updatedFilters = {
      ...filters
    };

    Object.keys(updatedFilters).forEach((filterId) => {
      updatedFilters[filterId].isApplied = updatedFilters[filterId].isSelected;
    });

    const appliedFilters = Object.keys(updatedFilters)
      .map((key) =>
        updatedFilters[key].isApplied ? updatedFilters[key] : undefined
      )
      .filter((object) => object !== undefined);

    filterDataWith(appliedFilters);
    setFilters(updatedFilters);
  };

  const alwaysApply = (filterId, condition) => {
    apply(filterId, condition, true);
    select(filterId, condition, true);
  };

  const apply = (filterId, condition, isAlwaysApplied = false) => {
    let updatedFilters = {
      ...filters
    };

    if (!isAlwaysApplied && isFilterCurrentlyApplied(filterId)) {
      updatedFilters = {
        ...filters,
        [filterId]: {
          isApplied: false
        }
      };
    } else {
      updatedFilters = {
        ...filters,
        [filterId]: {
          isApplied: true,
          condition
        }
      };
    }

    setFilters(updatedFilters);

    const appliedFilters = Object.keys(updatedFilters)
      .map((key) =>
        updatedFilters[key].isApplied ? updatedFilters[key] : undefined
      )
      .filter((object) => object !== undefined);

    filterDataWith(appliedFilters);
  };

  const isFilterCurrentlyApplied = (filterId) => {
    return filters[filterId] ? filters[filterId].isApplied : false;
  };

  const isFilterCurrentlySelected = (filterId) => {
    return filters[filterId] ? filters[filterId].isSelected : false;
  };

  const resetSelection = () => {
    let updatedFilters = {
      ...filters
    };

    Object.keys(updatedFilters).forEach(
      (key) => (updatedFilters[key].isSelected = updatedFilters[key].isApplied)
    );

    setFilters(updatedFilters);
  };

  const select = (filterId, condition, isAlwaysSelected = false) => {
    let updatedFilters = {
      ...filters
    };

    if (!isAlwaysSelected && isFilterCurrentlySelected(filterId)) {
      updatedFilters = {
        ...filters,
        [filterId]: {
          ...filters[filterId],
          isSelected: false,
          condition
        }
      };
    } else {
      updatedFilters = {
        ...filters,
        [filterId]: {
          ...filters[filterId],
          isSelected: true,
          condition
        }
      };
    }

    setFilters(updatedFilters);
  };

  return children({
    apply,
    applySelected,
    alwaysApply,
    applyTogether,
    isApplied: isFilterCurrentlyApplied,
    isSelected: isFilterCurrentlySelected,
    registerRemoveCallback,
    removeAll,
    select,
    resetSelection
  });
};

export const Filter = ({
  condition,
  apply,
  isApplied,
  applyTogether,
  isSelected,
  select,
  children
}) => {
  const createFilterId = () => `
    ${Date.now().toString(36)}
    ${Math.random().toString(36)}
    ${Math.random().toString(36)}`;

  const [filterId] = useState(createFilterId());

  const applyFilter = () => {
    if (!applyTogether) {
      apply(filterId, condition);
      return;
    }
    select(filterId, condition);
  };

  return children({
    isApplied: isApplied(filterId),
    isSelected: isSelected(filterId),
    applyFilter,
    applyTogether
  });
};
