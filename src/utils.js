const onFilterChangeHandler = {
  name: (a, filters) => {
    for (const filter of filters) {
      switch (filter) {
        case "a-g":
          if (
            a.firstName[0].toLowerCase() >= "a" &&
            a.firstName[0].toLowerCase() <= "g"
          )
            return true;
          break;
        case "h-r":
          if (
            a.firstName[0].toLowerCase() >= "h" &&
            a.firstName[0].toLowerCase() <= "r"
          )
            return true;
          break;
        case "s-z":
          if (
            a.firstName[0].toLowerCase() >= "s" &&
            a.firstName[0].toLowerCase() <= "z"
          )
            return true;
          break;
        default:
          return true;
      }
    }
    return false;
  },
  gender: (a, filters) => {
    for (const filter of filters) {
      if (a.gender.toLowerCase() === filter) return true;
    }
    return false;
  },
  type: (a, filters) => {
    for (const filter of filters) {
      if (a.type === filter) return true;
    }
    return false;
  },
  status: (a, filters) => {
    for (const filter of filters) {
      if (a.status === filter) return true;
    }
    return false;
  },
  department: (a, filters) => {
    for (const filter of filters) {
      if (a.department === filter) return true;
    }
    return false;
  },
  priority: (a, filters) => {
    for (const filter of filters) {
      if (a.priority === filter) return true;
    }
    return false;
  },
  creation_date: (a, filters) => {
    if (a.creation_date === filters || filters === '') {
      return true;
    }
    return false;
  },
};

export const filterData = (data, filterList) => {
  let filteredData = data;
  if (filterList) {
    Object.keys(filterList).forEach((name) => {
      const filters = filterList[name];
      const onChange = onFilterChangeHandler[name];
      if (onChange) {
        filteredData = filteredData.filter((d) => onChange(d, filters));
      }
    });
  }

  return filteredData;
};

export const getFilterList = (filterList, unselectedChipList = []) => {
  const newList = { ...filterList };
  for (let i = 0; i < unselectedChipList.length; i++) {
    delete newList[unselectedChipList[i]];
  }
  return newList;
};
