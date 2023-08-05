import React from "react";
import "@innovaccer/design-system/css/dist/index.css";
import { Card, Table } from "@innovaccer/design-system";
import { schema } from "./schema";
import { Header } from "./Header";
import { RightPanel } from "./RightPanel";
import { originalData } from "./data";
import { getFilterList, filterData } from "./utils";
import "./style.css";

const App = () => {
  const [showVerticalFilters, setShowVerticalFilters] = React.useState(true);
  const [filterList, setFilterList] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [tableData, setTableData] = React.useState(originalData);
  const [unselectedChipList, setUnselectedChipList] = React.useState([]);
  // const [error, setError] = React.useState(false);

  const classNames = showVerticalFilters ? "Table-verticalFilter" : "w-100";

  // const updateDataFn = React.useCallback(() => {

  //   const opts = {
  //     page: 1,
  //     pageSize: 7,
  //     sortingList: [],
  //     filterList,
  //     searchTerm: '',
  //     unselectedChipList: [],
  //   };

  //   setLoading(true);
  //   if (fetchData) {
  //     fetchData(opts)
  //       .then((res) => {
  //         const data = res.data;
  //         setLoading(false);
  //         console.log('then clock', loading)
  //         // const schema = schema ?? res.schema;
  //         // this.setState({
  //         //   data,
  //         //   // schema,
  //         //   // selectAll: getSelectAll(data),
  //         //   totalRecords: res.count,
  //         //   loading: false,
  //         //   error: !data.length,
  //         // });
  //       })
  //       .catch(() => {
  //         console.log('catch block')
  //         // this.setState({
  //         //   loading: false,
  //         //   error: true,
  //         //   data: [],
  //         // });
  //       });
  //   }
  // }, [filterList]);

  // React.useEffect(() => {
  //   updateDataFn();
  // }, [filterList, updateDataFn]);

  React.useEffect(() => {
    const updatedFilterList = getFilterList(filterList, unselectedChipList);
    const data = [...originalData];
    const filteredData = filterData(
      data,
      updatedFilterList,
      unselectedChipList
    );

    console.log("filteredData----", filteredData);
    setLoading(false);
    setTableData([...filteredData]);
  }, [filterList, unselectedChipList]);

  // const fetchData = (options) => {
  //   const {
  //     page,
  //     pageSize,
  //     sortingList,
  //     filterList,
  //     searchTerm,
  //     unselectedChipList,
  //   } = options;
  //   console.log("step 22", filterList, unselectedChipList);

  //   const onSearch = (d, searchTerm = "") => {
  //     return (
  //       d.firstName.toLowerCase().match(searchTerm.toLowerCase()) ||
  //       d.lastName.toLowerCase().match(searchTerm.toLowerCase())
  //     );

  //     // return true;
  //   };

  //   // const data = JSON.stringify(originalData.slice(0, 10), null, 4);
  //   const data = originalData;
  //   const updatedFilterList = getFilterList(filterList, unselectedChipList);

  //   const filteredData = filterData(
  //     data,
  //     updatedFilterList,
  //     unselectedChipList
  //   );
  //   const searchedData = filteredData.filter((d) => onSearch(d, searchTerm));
  //   const sortedData = sortData(schema, searchedData, sortingList);

  //   if (page && pageSize) {
  //     return new Promise((resolve) => {
  //       // setTimeout(() => {
  //       const start = (page - 1) * pageSize;
  //       const end = start + pageSize;
  //       const slicedData = sortedData.slice(start, end);
  //       resolve({
  //         searchTerm,
  //         schema,
  //         count: sortedData?.length,
  //         data: slicedData,
  //       });
  //       // }, 2000);
  //     });
  //   }

  //   return new Promise((resolve) => {
  //     // setTimeout(() => {
  //     resolve({
  //       searchTerm,
  //       schema,
  //       count: sortedData?.length,
  //       data: sortedData,
  //     });
  //     // }, 2000);
  //   });
  // };

  const toggleVerticalFilter = () => {
    setShowVerticalFilters(!showVerticalFilters);
  };

  const updateSelectedChipList = (newList) => {
    setLoading(true);

    setUnselectedChipList(newList);
  };

  const updateFilterList = (newFilterList) => {
    if (newFilterList !== filterList) {
      setFilterList(newFilterList);
      setLoading(true);
    }
  };

  const onFilterChange = (name, selected) => {
    const newFilterList = {
      ...filterList,
      [name]: selected,
    };

    updateFilterList(newFilterList);
  };

  // const onSearchHandler = (currData, searchTerm) => {
  //   console.log("onsearch called", searchTerm);
  //   setError(!error);
  //   return currData.filter(
  //     (d) =>
  //       d.firstName.toLowerCase().match(searchTerm.toLowerCase()) ||
  //       d.lastName.toLowerCase().match(searchTerm.toLowerCase())
  //   );
  // };

  const headerOptions = {
    filterList,
    updateFilterList,
    updateSelectedChipList,
    unselectedChipList,
    toggleVerticalFilter,
  };

  return (
    <div className="d-flex vh-100">
      <div className={classNames}>
        <Card className="overflow-hidden">
          <Table
            // key={loading}
            // fetchData={fetchData}
            // error={error}
            pageSize={7}
            schema={schema}
            data={tableData}
            loading={loading}
            withHeader={true}
            withCheckbox={true}
            withPagination={true}
            // onSearch={onSearchHandler}
            headerOptions={{
              children: <Header {...headerOptions} />,
            }}
          />
        </Card>
      </div>
      <RightPanel
        loading={loading}
        onFilterChange={onFilterChange}
        filterList={filterList}
        showVerticalFilters={showVerticalFilters}
        onCloseHandler={toggleVerticalFilter}
      />
    </div>
  );
};

export default App;
