import React from "react";
import "@innovaccer/design-system/css/dist/index.css";
import { Button } from "@innovaccer/design-system";
import { Table } from "./Table";
const App = () => {
  const schema = [
    {
      name: "name",
      displayName: "Name",
      width: 300,
      resizable: true,
      separator: true,
      tooltip: true,
      translate: (a) => ({
        title: `${a.firstName} ${a.lastName}`,
        firstName: a.firstName,
        lastName: a.lastName,
      }),
      cellType: "AVATAR_WITH_TEXT",
    },
    {
      name: "email",
      displayName: "Email",
      width: 350,
      resizable: true,
      sorting: false,
      cellType: "WITH_META_LIST",
    },
    {
      name: "gender",
      displayName: "Gender",
      width: 200,
      resizable: true,
      comparator: (a, b) => a.gender.localeCompare(b.gender),
      cellType: "STATUS_HINT",
      translate: (a) => ({
        title: a.gender,
        statusAppearance: a.gender === "Female" ? "alert" : "success",
      }),
    },
    {
      name: "status",
      displayName: "Status",
      width: 200,
      sorting: false,
      resizable: true,
      comparator: (a, b) => a.status.localeCompare(b.status),
      cellType: "STATUS_HINT",
      translate: (a) => ({
        title: a.status,
        statusAppearance: a.status === "Failed" ? "alert" : "success",
      }),
    },
    // {
    //   name: "status",
    //   displayName: "Status",
    //   width: "20%",
    //   cellType: "STATUS_HINT",
    //   comparator: (a, b) => a.status.localeCompare(b.status),
    //   translate: (a) => ({
    //     title: a.status,
    //     statusAppearance: a.status === "Failed" ? "alert" : "success",
    //   }),
    //   filters: [
    //     { label: "Failed", value: "failed" },
    //     { label: "Completed", value: "completed" },
    //   ],
    //   onFilterChange: (a, filters) => {
    //     for (const filter of filters) {
    //       if (a.status.toLowerCase() === filter) return true;
    //     }
    //     return false;
    //   },
    // },
    {
      name: "icon",
      displayName: "Icon",
      width: 100,
      resizable: true,
      sorting: false,
      align: "center",
      cellType: "ICON",
      translate: (_) => ({
        icon: "events",
      }),
    },
    {
      name: "customCell",
      displayName: "Custom Cell",
      width: 200,
      sorting: false,
      resizable: true,
      separator: true,
      cellRenderer: (props) => {
        const { loading } = props;

        if (loading) return <div></div>;

        return <Button appearance={"primary"}>Button</Button>;
      },
    },
  ];

  const originalData = [
    {
      firstName: "Brooke",
      lastName: "Heeran",
      email: "bheeran0@altervista.org",
      gender: "Female",
      status: "Failed",
    },
    {
      firstName: "Frazer",
      lastName: "Cathro",
      email: "fcathro1@ucla.edu",
      gender: "Male",
      status: "Failed",
    },
    {
      firstName: "Lemmie",
      lastName: "Ciric",
      email: {
        title: "lciric2@dmoz.org",
        metaList: ["First", "Second"],
      },
      gender: "Male",
      status: "Completed",
    },
    {
      firstName: "Randy",
      lastName: "Boatwright",
      email: "rboatwright3@arstechnica.com",
      status: "Completed",
      gender: "Male",
    },
    {
      firstName: "Rolando",
      lastName: "Cyples",
      email: "rcyples4@biglobe.ne.jp",
      gender: "Male",
      status: "Failed",
    },
    {
      firstName: "Lem",
      lastName: "Males",
      email: "lmales5@admin.ch",
      gender: "Male",
      status: "Failed",
    },
    {
      firstName: "Sayres",
      lastName: "Adelberg",
      email: "sadelberg6@uol.com.br",
      gender: "Female",
      status: "Completed",
    },
    {
      firstName: "Murray",
      lastName: "Bravington",
      email: "mbravington7@drupal.org",
      gender: "Male",
      status: "Failed",
    },
    {
      firstName: "Jena",
      lastName: "Swatheridge",
      email: "jswatheridge8@npr.org",
      gender: "Female",
      status: "Failed",
    },
    {
      firstName: "Annabel",
      lastName: "Nelsey",
      email: "anelsey9@google.com",
      gender: "Female",
      status: "Completed",
    },
    {
      firstName: "Carin",
      lastName: "Robiou",
      email: "crobioua@skype.com",
      gender: "Female",
      status: "Completed",
    },
    {
      firstName: "Anson",
      lastName: "Gamon",
      email: "agamonb@economist.com",
      gender: "Male",
      status: "Failed",
    },
    {
      firstName: "Brina",
      lastName: "Pirie",
      email: "bpiriec@stumbleupon.com",
      gender: "Female",
      status: "Failed",
    },
    {
      firstName: "Hermy",
      lastName: "Dyett",
      email: "hdyettd@boston.com",
      gender: "Male",
      status: "Failed",
    },
    {
      firstName: "Aime",
      lastName: "von Hagt",
      email: "avonhagte@nyu.edu",
      gender: "Female",
      status: "Failed",
    },
    {
      firstName: "Wash",
      lastName: "Vannuchi",
      email: "wvannuchi1f@japanpost.jp",
      gender: "Male",
      status: "Failed",
    },
    {
      firstName: "Nikki",
      lastName: "Faye",
      email: "nfaye1g@feedburner.com",
      gender: "Female",
      status: "Completed",
    },
    {
      firstName: "Aron",
      lastName: "Scimonelli",
      email: "ascimonelli1h@nationalgeographic.com",
      gender: "Male",
      status: "Failed",
    },
    {
      firstName: "Smitty",
      lastName: "Giacomello",
      email: "sgiacomello1i@google.co.uk",
      gender: "Male",
      status: "Failed",
    },

    {
      firstName: "Annis",
      lastName: "Linkie",
      email: "alinkie2a@wp.com",
      gender: "Female",
      status: "Completed",
    },

    {
      firstName: "Cass",
      lastName: "Boot",
      email: "cboot2g@furl.net",
      gender: "Male",
      status: "Completed",
    },
    {
      firstName: "Montague",
      lastName: "Rossey",
      email: "mrossey2h@goo.gl",
      gender: "Male",
      status: "Completed",
    },
    {
      firstName: "Garrek",
      lastName: "Matignon",
      email: "gmatignon2r@noaa.gov",
      gender: "Male",
      status: "Failed",
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
