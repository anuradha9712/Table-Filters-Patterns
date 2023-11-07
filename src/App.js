import React from "react";
import "@innovaccer/design-system/css/dist/index.css";
import { Card, Table, Toast } from "@innovaccer/design-system";
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
  const [searchTerm, setSearchTerm] = React.useState("");
  const [pinnedFilterList, setPinnedFilterList] = React.useState([]);
  const [showToast, setShowToast] = React.useState(false);

  const classNames = showVerticalFilters
    ? "Table-verticalFilter Table-panel--open"
    : "Table-panel--close";

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

  React.useEffect(() => {
    const searchResult = originalData.filter((data) => {
      return (
        data.firstName.toLowerCase().match(searchTerm.toLowerCase()) ||
        data.lastName.toLowerCase().match(searchTerm.toLowerCase())
      );
    });
    setTableData(searchResult);
    setLoading(false);

  }, [searchTerm]);

  React.useEffect(() => {
    if(showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 1500);
    }
  }, [showToast]);

  const toggleVerticalFilter = () => {
    setShowVerticalFilters(!showVerticalFilters);
  };

  const updateSelectedChipList = (newList) => {
    setLoading(true);

    setUnselectedChipList(newList);
  };

  const updateFilterList = (newFilterList) => {
    setFilterList(newFilterList);
    if (filterList !== newFilterList) {
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

  const updateSearchTerm = (searchTerm) => {
    setLoading(true);
    setSearchTerm(searchTerm);
  };

  const headerOptions = {
    loading,
    filterList,
    onFilterChange,
    updateSearchTerm,
    updateFilterList,
    pinnedFilterList,
    unselectedChipList,
    showVerticalFilters,
    toggleVerticalFilter,
    updateSelectedChipList,
    setShowToast,
  };

  return (
    <div>
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
          filterList={filterList}
          updateFilterList={updateFilterList}
          onCloseHandler={toggleVerticalFilter}
          showVerticalFilters={showVerticalFilters}
          setPinnedFilterList={setPinnedFilterList}
        />
      </div>
      {showToast && (
        <Toast
          appearance="success"
          title="Saved filter view"
          onClose={() => setShowToast(false)}
          className="position-fixed Filter-toast"
          message="You can find this view later in the “filter views” list."
        />
      )}
    </div>
  );
};

export default App;
