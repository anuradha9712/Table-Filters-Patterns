import * as React from "react";
import { Chip, Text, Button } from "@innovaccer/design-system";

export const HeaderFilters = (props) => {
  const { filterList, clearAllFilter } = props;
  const [originalFilterList, setFilterList] = React.useState(filterList);
  const filterLength = Object.keys(originalFilterList).length;
  console.log("clear filters", filterList, filterLength);

  React.useEffect(() => {
    setFilterList(filterList);
  },[filterList]);

  const getLabel = (filter) => {
    return (
      <span>
        <Text className="mr-3" color="primary" weight="medium">
          {filter}:
        </Text>
        <Text color="primary">{originalFilterList[filter].toString()}</Text>
      </span>
    );
  };

  const clearFilterHandler = () => {
    clearAllFilter && clearAllFilter();
    setFilterList({});
  }

  return (
    <div
      className="d-flex align-items-center flex-wrap flex-row"
      style={{ rowGap: "8px" }}
    >
      {Object.keys(originalFilterList).map((filter) => {
        console.log("filter value", originalFilterList[filter]);
        return (
          <>
            <Chip
              onClick={function () {}}
              onClose={function () {}}
              selected={true}
              type="selection"
              clearButton={true}
              label={getLabel(filter)}
              className="mr-4"
            />
          </>
        );
      })}
      {filterLength > 0 && (
        <div className="border-left pl-4">
          <Button
            appearance="transparent"
            aria-label="Re-evaluate"
            onClick={clearFilterHandler}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default HeaderFilters;
