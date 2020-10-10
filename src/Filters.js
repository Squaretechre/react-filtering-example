import { useState } from "react";

export const Filters = ({
  getOriginalDataSet,
  setFilteredDataSet,
  children
}) => {
  const [filters, setFilters] = useState([]);

  const removeAll = () => {
    const removedFilters = {
      ...filters
    };

    Object.keys(removedFilters).forEach((filterName) => {
      removedFilters[filterName].isApplied = false;
    });

    setFilteredDataSet(getOriginalDataSet);
    setFilters(removedFilters);
  };

  const apply = (name, transformation) => {
    let updatedFilters = {
      ...filters
    };

    if (isApplied(name)) {
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

  const isApplied = (name) => {
    return filters[name] ? filters[name].isApplied : false;
  };

  return children(apply, isApplied, removeAll);
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
