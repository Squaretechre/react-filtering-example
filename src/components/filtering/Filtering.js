import { useState } from "react";

export const Filtering = ({
  getOriginalDataSet,
  setFilteredDataSet,
  onRemoveAll,
  applyTogether,
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
      removedFilters[filterName].isSelected = false;
    });

    setFilteredDataSet(getOriginalDataSet);
    setFilters(removedFilters);

    onRemoveAll.forEach((callback) => callback());
  };

  const filterDataWith = (filters) => {
    let filteredDataSet = getOriginalDataSet;

    Object.keys(filters).forEach((filterName) => {
      const filterToApply = filters[filterName];
      filteredDataSet = filteredDataSet.filter(filterToApply.transformation);
    });

    setFilteredDataSet(filteredDataSet);
  };

  const applySelected = () => {
    const updatedFilters = {
      ...filters
    };

    Object.keys(updatedFilters).forEach((filterName) => {
      updatedFilters[filterName].isApplied =
        updatedFilters[filterName].isSelected;
    });

    const appliedFilters = Object.keys(updatedFilters)
      .map((key) =>
        updatedFilters[key].isApplied ? updatedFilters[key] : undefined
      )
      .filter((object) => object !== undefined);

    filterDataWith(appliedFilters);
    setFilters(updatedFilters);
  };

  const alwaysApply = (name, transformation) => {
    apply(name, transformation, true);
    select(name, transformation, true);
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

    setFilters(updatedFilters);

    const appliedFilters = Object.keys(updatedFilters)
      .map((key) =>
        updatedFilters[key].isApplied ? updatedFilters[key] : undefined
      )
      .filter((object) => object !== undefined);

    filterDataWith(appliedFilters);
  };

  const isFilterCurrentlyApplied = (name) => {
    return filters[name] ? filters[name].isApplied : false;
  };

  const isFilterCurrentlySelected = (name) => {
    return filters[name] ? filters[name].isSelected : false;
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

  const select = (name, transformation, isAlwaysSelected = false) => {
    let updatedFilters = {
      ...filters
    };

    if (!isAlwaysSelected && isFilterCurrentlySelected(name)) {
      updatedFilters = {
        ...filters,
        [name]: {
          ...filters[name],
          isSelected: false,
          transformation
        }
      };
    } else {
      updatedFilters = {
        ...filters,
        [name]: {
          ...filters[name],
          isSelected: true,
          transformation
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
  transformation,
  name,
  apply,
  isApplied,
  applyTogether,
  isSelected,
  select,
  children
}) => {
  const applyFilter = () => {
    if (!applyTogether) {
      apply(name, transformation);
      return;
    }
    select(name, transformation);
  };

  return children({
    isApplied: isApplied(name),
    isSelected: isSelected(name),
    applyFilter,
    applyTogether
  });
};
