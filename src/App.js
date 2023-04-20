import React from "react";
import "@innovaccer/design-system/css/dist/index.css";
import { Table } from "./Table";
import { originalData } from "./data";

const App = () => {
  const schema = [
    {
      name: "name",
      displayName: "Name",
      resizable: true,
      separator: true,
      tooltip: true,
      translate: (a) => ({
        title: `${a.firstName} ${a.lastName}`,
        firstName: a.firstName,
        lastName: a.lastName,
      }),
      cellType: "AVATAR_WITH_TEXT",
      width: "15%",
    },
    {
      name: "email",
      displayName: "Email",
      resizable: true,
      sorting: false,
      cellType: "WITH_META_LIST",
      width: "20%",
    },
    {
      name: "gender",
      displayName: "Gender",
      resizable: true,
      comparator: (a, b) => a.gender.localeCompare(b.gender),
      cellType: "STATUS_HINT",
      width: "10%",
      translate: (a) => ({
        title: a.gender,
        statusAppearance: a.gender === "Female" ? "alert" : "success",
      }),
    },
    {
      name: "type",
      displayName: "Type",
      sorting: false,
      cellType: "DEFAULT",
      width: "15%",
    },
    {
      name: "status",
      displayName: "Status",
      sorting: false,
      resizable: true,
      comparator: (a, b) => a.status.localeCompare(b.status),
      cellType: "STATUS_HINT",
      width: "15%",
      translate: (a) => ({
        title: a.status,
        statusAppearance: a.status === "Failed" ? "alert" : "success",
      }),
    },
    {
      name: "department",
      displayName: "Department",
      sorting: false,
      cellType: "DEFAULT",
      width: "15%",
    },
    {
      name: "priority",
      displayName: "Priority",
      sorting: false,
      cellType: "DEFAULT",
      width: "10%",
    },
  ];

  const translateData = (schema, data) => {
    let newData = data;

    if (schema.translate) {
      const translatedData = schema.translate(data);
      newData = {
        ...newData,
        [schema.name]:
          typeof translatedData === "object"
            ? {
                ...newData[schema.name],
                ...translatedData,
              }
            : translatedData,
      };
    }
    if (typeof newData[schema.name] !== "object")
      newData[schema.name] = { title: newData[schema.name] };

    return newData;
  };

  const sortData = (schema, data, sortingList) => {
    const sortedData = [...data];
    sortingList.forEach((l) => {
      const sIndex = schema.findIndex((s) => s.name === l.name);
      if (sIndex !== -1) {
        const defaultComparator = (a, b) => {
          const aData = translateData(schema[sIndex], a);
          const bData = translateData(schema[sIndex], b);
          return aData[l.name].title.localeCompare(bData[l.name].title);
        };

        const { comparator = defaultComparator } = schema[sIndex];

        sortedData.sort(comparator);
        if (l.type === "desc") sortedData.reverse();
      }
    });

    return sortedData;
  };

  const onFilterChange = {
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
  };

  const filterData = (data, filterList) => {
    // debugger;
    let filteredData = data;
    if (filterList) {
      Object.keys(filterList).forEach((name) => {
        const filters = filterList[name];
        const onChange = onFilterChange[name];
        if (onChange) {
          filteredData = filteredData.filter((d) => onChange(d, filters));
        }
      });
    }

    console.log(
      "step 3",
      data,
      "filterList",
      filterList,
      "filteredData",
      filteredData
    );

    return filteredData;
  };

  const fetchData = (options) => {
    const { page, pageSize, sortingList, filterList, searchTerm } = options;
    console.log("step 2", filterList);

    const onSearch = (d, searchTerm = "") => {
      return (
        d.firstName.toLowerCase().match(searchTerm.toLowerCase()) ||
        d.lastName.toLowerCase().match(searchTerm.toLowerCase())
      );

      // return true;
    };

    // const data = JSON.stringify(originalData.slice(0, 10), null, 4);
    const data = originalData;

    const filteredData = filterData(data, filterList);
    const searchedData = filteredData.filter((d) => onSearch(d, searchTerm));
    const sortedData = sortData(schema, searchedData, sortingList);

    if (page && pageSize) {
      return new Promise((resolve) => {
        // setTimeout(() => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const slicedData = sortedData.slice(start, end);
        resolve({
          searchTerm,
          schema,
          count: sortedData.length,
          data: slicedData,
        });
        // }, 2000);
      });
    }

    return new Promise((resolve) => {
      // setTimeout(() => {
      resolve({
        searchTerm,
        schema,
        count: sortedData.length,
        data: sortedData,
      });
      // }, 2000);
    });
  };

  const loaderSchema = schema.filter((s) => {
    const { name, displayName, width, separator, cellType, cellRenderer } = s;
    return {
      name,
      displayName,
      width,
      separator,
      cellType,
      cellRenderer,
    };
  });

  return (
    <div>
      <Table loaderSchema={loaderSchema} fetchData={fetchData} />
    </div>
  );
};

export default App;
