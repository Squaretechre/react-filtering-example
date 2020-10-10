import { useState } from "react";

export const Filter = ({
  transformation,
  name,
  apply,
  isApplied,
  children
}) => {
  const onClick = () => {
    apply(name, transformation);
  };

  const applied = () => {
    return isApplied(name);
  };

  return children(applied, onClick);
};

export const Filters = ({ originalDataSet, updateDataSet, children }) => {
  const [filters, setFilters] = useState([]);

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

    let filteredDataSet = originalDataSet;

    Object.keys(appliedFilters).forEach((filterName) => {
      const filterToApply = appliedFilters[filterName];
      filteredDataSet = filteredDataSet.filter(filterToApply.transformation);
    });

    updateDataSet(filteredDataSet);
    setFilters(updatedFilters);
  };

  const isApplied = (name) => {
    return filters[name] ? filters[name].isApplied : false;
  };

  return children(apply, isApplied);
};
