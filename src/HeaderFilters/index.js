import * as React from "react";
import { Chip, Text, Button } from "@innovaccer/design-system";
import { TableContext } from "../TableContext";

export const HeaderFilters = () => {
  const contextProp = React.useContext(TableContext);
  const {
    filterList,
    updateFilterList,
    updateSelectedChipList,
    unselectedChipList,
  } = contextProp;

  const getLabel = (filter, selected) => {
    const color = selected ? 'primary': 'inverse';
    return (
      <span>
        <Text className="mr-3" color={color} weight="medium">
          {filter}:
        </Text>
        <Text color={color}>{filterList[filter].toString()}</Text>
      </span>
    );
  };

  const onChipClose = (filter) => {
    const newList = { ...filterList };
    delete newList[filter];
    updateFilterList(newList);
  };

  const onChipClick = (filter) => {
    if (unselectedChipList.includes(filter)) {
      let newList = unselectedChipList.filter((item) => item !== filter);
      updateSelectedChipList(newList);
    } else {
      updateSelectedChipList([...unselectedChipList, filter]);
    }
  };

  return (
    <div
      className="d-flex align-items-center flex-wrap flex-row"
      style={{ rowGap: "8px" }}
    >
      {Object.keys(filterList).map((filter) => {
        const selected = !unselectedChipList.includes(filter);
        if (filterList[filter].length === 0) {
          return;
        }
        return (
          <>
            <Chip
              onClick={() => onChipClick(filter)}
              onClose={() => onChipClose(filter)}
              selected={selected}
              type="selection"
              clearButton={true}
              label={getLabel(filter, selected)}
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
