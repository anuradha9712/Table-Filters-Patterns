import * as React from "react";
import { Chip, Text, Button } from "@innovaccer/design-system";
import { TableContext } from "../TableContext";

export const HeaderFilters = () => {
  const contextProp = React.useContext(TableContext);
  const { filterList, updateFilterList } = contextProp;

  const getLabel = (filter) => {
    return (
      <span>
        <Text className="mr-3" color="primary" weight="medium">
          {filter}:
        </Text>
        <Text color="primary">{filterList[filter].toString()}</Text>
      </span>
    );
  };

  return (
    <div
      className="d-flex align-items-center flex-wrap flex-row"
      style={{ rowGap: "8px" }}
    >
      {Object.keys(filterList).map((filter) => {
        
        if (filterList[filter].length === 0) {
          return;
        }
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
      {Object.keys(filterList).length > 0 && (
        <div className="border-left pl-4">
          <Button
            appearance="transparent"
            aria-label="Re-evaluate"
            onClick={() => updateFilterList({})}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default HeaderFilters;
