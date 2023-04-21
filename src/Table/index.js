import * as React from "react";
import { debounce } from "throttle-debounce";
import { Card, Grid, Pagination } from "@innovaccer/design-system";
import { updateBatchData, getSelectAll, getTotalPages } from "./utils";
import Header from "./TableHeader";
import RightPanel from "../RightPanel";
import { TableContext } from "../TableContext";
import "./style.css";

export class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      schema: [],
      page: 1,
      totalRecords: 0,
      sortingList: props.sortingList || [],
      filterList: props.filterList || {},
      unselectedChipList: [],
      loading: true,
      error: false,
      selectAll: getSelectAll([]),
      searchTerm: undefined,
      showVerticalFilters: props.showVerticalFilters,
    };

    this.pageSize = 8;
    this.searchDebounceDuration = 750;
    this.debounceUpdate = debounce(
      this.searchDebounceDuration,
      this.updateDataFn
    );
  }

  componentDidMount() {
    this.updateData();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      const { onPageChange } = this.props;
      if (onPageChange) onPageChange(this.state.page);
    }

    if (
      prevState.page !== this.state.page ||
      prevState.filterList !== this.state.filterList ||
      prevState.sortingList !== this.state.sortingList ||
      prevState.searchTerm !== this.state.searchTerm ||
      prevState.unselectedChipList !== this.state.unselectedChipList
    ) {
      if (!this.props.loading) this.updateData({});
    }
  }

  updateData() {
    this.setState({
      loading: true,
    });

    this.debounceUpdate();
  }

  updateDataFn() {
    this.onSelect(-1, false);
    console.log("step 1");

    const { fetchData } = this.props;

    const { page, sortingList, filterList, searchTerm, unselectedChipList } =
      this.state;

    const { pageSize } = this;

    const opts = {
      page,
      pageSize,
      sortingList,
      filterList,
      searchTerm,
      unselectedChipList,
    };

    this.setState({
      loading: true,
    });
    if (fetchData) {
      fetchData(opts)
        .then((res) => {
          const data = res.data;
          const schema = this.state.schema.length
            ? this.state.schema
            : res.schema;
          this.setState({
            data,
            schema,
            selectAll: getSelectAll(data),
            totalRecords: res.count,
            loading: false,
            error: !data.length,
          });
        })
        .catch(() => {
          this.setState({
            loading: false,
            error: true,
            data: [],
          });
        });
    }
  }

  onSelect(rowIndexes, selected) {
    const { data } = this.state;

    const { onSelect } = this.props;

    const indexes = [rowIndexes];
    let newData = data;
    if (rowIndexes >= 0) {
      newData = updateBatchData(data, indexes, {
        _selected: selected,
      });

      this.setState({
        data: newData,
        selectAll: getSelectAll(newData),
      });
    }

    if (onSelect) {
      onSelect(
        indexes,
        selected,
        rowIndexes === -1 ? [] : newData.filter((d) => d._selected)
      );
    }
  }

  onSelectAll(selected, selectAll) {
    const { onSelect } = this.props;

    const { data } = this.state;

    const indexes = Array.from({ length: data.length }, (_, i) => i);

    const newData = updateBatchData(data, indexes, {
      _selected: selected,
    });

    if (onSelect) {
      onSelect(
        indexes,
        selected,
        newData.filter((d) => d._selected),
        selectAll
      );
    }

    this.setState({
      data: newData,
      selectAll: getSelectAll(newData),
    });
  }

  onPageChange(newPage) {
    this.setState({
      page: newPage,
    });
  }

  onFilterChange(name, selected) {
    const { filterList } = this.props;

    const newFilterList = {
      ...filterList,
      [name]: selected,
    };

    this.updateFilterList(newFilterList);
  }

  updateShowVerticalFilters(val) {
    this.setState({
      showVerticalFilters: val,
    });
  }

  updateSchema(newSchema) {
    this.setState({
      schema: newSchema,
    });
  }

  updateSortingList(newSortingList) {
    const { multipleSorting } = this.props;

    this.setState({
      sortingList: multipleSorting
        ? [...newSortingList]
        : newSortingList.slice(-1),
      page: 1,
    });
  }

  updateFilterList(newFilterList) {
    const newList = { ...this.state.filterList, ...newFilterList };
    console.log(
      "newList",
      newList,
      "newFilterList",
      newFilterList,
      "this.state.filterList"
    );
    this.setState({
      filterList: newFilterList,
      // filterList: newList,
      page: 1,
    });
  }

  updateSelectedChipList(newList) {
    this.setState({
      unselectedChipList: newList,
      page: 1,
    });
  }

  updateSearchTerm(newSearchTerm) {
    this.setState({
      searchTerm: newSearchTerm,
      page: 1,
    });
  }

  handleCloseHandler() {
    this.setState({ showVerticalFilters: false });
  }

  render() {
    const { loaderSchema } = this.props;

    const withCheckbox = true;
    const withPagination = true;
    const { pageSize } = this;

    const { totalRecords, showVerticalFilters, loading } = this.state;
    const totalPages = getTotalPages(totalRecords, pageSize);

    const classNames = showVerticalFilters ? "Table-verticalFilter" : "w-100";

    const contextValue = {
      filterList: this.state.filterList,
      updateFilterList: this.updateFilterList.bind(this),
      unselectedChipList: this.state.unselectedChipList,
      updateSelectedChipList: this.updateSelectedChipList.bind(this),
    };

    return (
      <TableContext.Provider value={contextValue}>
        <div className="Table-container">
          <div className={classNames}>
            <Card className="Table overflow-hidden">
              <div className="Table-header">
                <Header
                  {...this.state}
                  updateSchema={this.updateSchema.bind(this)}
                  // updateFilterList={this.updateFilterList.bind(this)}
                  updateSearchTerm={this.updateSearchTerm.bind(this)}
                  updateShowVerticalFilters={this.updateShowVerticalFilters.bind(
                    this
                  )}
                  onSelectAll={this.onSelectAll.bind(this)}
                  withCheckbox={withCheckbox}
                  withPagination={withPagination}
                  pageSize={pageSize}
                />
              </div>
              <div className="Table-grid">
                <Grid
                  {...this.state}
                  updateData={this.updateData.bind(this)}
                  updateSchema={this.updateSchema.bind(this)}
                  updateSortingList={this.updateSortingList.bind(this)}
                  updateFilterList={this.updateFilterList.bind(this)}
                  withCheckbox={withCheckbox}
                  onSelect={this.onSelect.bind(this)}
                  onSelectAll={this.onSelectAll.bind(this)}
                  showMenu={true}
                  type="data"
                  size="comfortable"
                  draggable={true}
                  withPagination={withPagination && totalPages > 1}
                  pageSize={pageSize}
                  loaderSchema={loaderSchema}
                />
              </div>
              {withPagination && totalPages > 1 && (
                <div className="Table-pagination">
                  <Pagination
                    page={this.state.page}
                    totalPages={getTotalPages(totalRecords, pageSize)}
                    type="jump"
                    onPageChange={this.onPageChange.bind(this)}
                  />
                </div>
              )}
            </Card>
          </div>
          <RightPanel
            loading={loading}
            onCloseHandler={() => this.setState({ showVerticalFilters: false })}
            onFilterChange={(name, selected) =>
              this.onFilterChange(name, selected)
            }
            showVerticalFilters={showVerticalFilters}
          />
        </div>
      </TableContext.Provider>
    );
  }
}

export default Table;
