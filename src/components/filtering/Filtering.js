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

  const degroup = (filters) => {
    const groupSet = Object.keys(filters)
      .filter((key) => filters[key].group !== undefined)
      .reduce((groups, key) => {
        return groups.add(filters[key].group);
      }, new Set());

    const uniqueGroups = [...groupSet];

    const filtersWithGroupAssigned = Object.keys(filters)
      .map((filterName) => {
        const filter = filters[filterName];
        return filter.group ? filter : undefined;
      })
      .filter((object) => object !== undefined);

    const idsForfiltersWithoutGroupAssigned = Object.keys(filters)
      .map((filterId) => {
        const filter = filters[filterId];
        return filter.group === undefined ? filterId : undefined;
      })
      .filter((object) => object !== undefined);

    const filtersWithoutGroupAssigned = Object.keys(filters).reduce(
      (filtersAccumulator, filterId) => {
        if (idsForfiltersWithoutGroupAssigned.includes(filterId)) {
          filtersAccumulator[filterId] = filters[filterId];
        }
        return filtersAccumulator;
      },
      {}
    );

    const combinedGroupFilters = uniqueGroups.reduce(
      (filtersAccumulator, groupName) => {
        const filtersAssignedToThisGroup = filtersWithGroupAssigned
          .map((filter) => {
            return filter.group === groupName ? filter : undefined;
          })
          .filter((object) => object !== undefined);

        const conditionsInThisGroup = filtersAssignedToThisGroup.map(
          (filter) => filter.condition
        );

        filtersAccumulator[groupName] = {
          condition: (input) =>
            conditionsInThisGroup.some((condition) => condition(input))
        };

        return filtersAccumulator;
      },
      {}
    );

    return {
      ...combinedGroupFilters,
      ...filtersWithoutGroupAssigned
    };
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

    filterDataWith(degroup(appliedFilters));
    setFilters(updatedFilters);
  };

  const alwaysApply = (filterId, condition) => {
    apply(filterId, undefined, condition, true);
    select(filterId, undefined, condition, true);
  };

  const apply = (filterId, group, condition, isAlwaysApplied = false) => {
    let updatedFilters = {
      ...filters
    };

    if (!isAlwaysApplied && isFilterCurrentlyApplied(filterId)) {
      updatedFilters = {
        ...filters,
        [filterId]: {
          isApplied: false,
          group
        }
      };
    } else {
      updatedFilters = {
        ...filters,
        [filterId]: {
          isApplied: true,
          condition,
          group
        }
      };
    }

    setFilters(updatedFilters);

    const appliedFilters = Object.keys(updatedFilters)
      .map((key) =>
        updatedFilters[key].isApplied ? updatedFilters[key] : undefined
      )
      .filter((object) => object !== undefined);

    filterDataWith(degroup(appliedFilters));
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

  const select = (filterId, group, condition, isAlwaysSelected = false) => {
    let updatedFilters = {
      ...filters
    };

    if (!isAlwaysSelected && isFilterCurrentlySelected(filterId)) {
      updatedFilters = {
        ...filters,
        [filterId]: {
          ...filters[filterId],
          group,
          isSelected: false,
          condition
        }
      };
    } else {
      updatedFilters = {
        ...filters,
        [filterId]: {
          group,
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
  group,
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
    if (applyTogether) {
      select(filterId, group, condition);
      return;
    }
    apply(filterId, group, condition);
  };

  return children({
    isApplied: isApplied(filterId),
    isSelected: isSelected(filterId),
    applyFilter,
    applyTogether
  });
};
