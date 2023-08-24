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

  const classNames = showVerticalFilters ? "Table-verticalFilter" : "w-100";

  React.useEffect(() => {
    const updatedFilterList = getFilterList(filterList, unselectedChipList);
    const data = [...originalData];
    const filteredData = filterData(
      data,
      updatedFilterList,
      unselectedChipList
    );

    setLoading(false);
    setTableData([...filteredData]);
  }, [filterList, unselectedChipList]);

  const toggleVerticalFilter = () => {
    setShowVerticalFilters(!showVerticalFilters);
  };

  const updateSelectedChipList = (newList) => {
    setLoading(true);

    setUnselectedChipList(newList);
  };

  const updateFilterList = (newFilterList) => {
    console.log("newFilterList", newFilterList, "filterList", filterList);
    if (newFilterList !== filterList) {
      setFilterList(newFilterList);
      setLoading(true);
    }
  };

  const onFilterChange = (name, selected) => {
    // debugger;
    const newFilterList = {
      ...filterList,
      [name]: selected,
    };

    updateFilterList(newFilterList);
  };

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
            pageSize={7}
            schema={schema}
            data={tableData}
            loading={loading}
            withHeader={true}
            withCheckbox={true}
            withPagination={true}
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
