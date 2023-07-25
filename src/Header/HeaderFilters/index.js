import * as React from "react";
import { Chip, Text, LinkButton } from "@innovaccer/design-system";
import { SavedFilterView } from "../SavedFilterView";
// import { TableContext } from "../TableContext";

export const HeaderFilters = ({
  filterList,
  updateFilterList,
  updateSelectedChipList,
  unselectedChipList,
  savedFilterList,
  updateSavedFilterList,
}) => {
  const getLabel = (filter, selected) => {
    const color = selected ? "primary" : "inverse";
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
      {Object.keys(filterList).map((filter, key) => {
        const selected = !unselectedChipList.includes(filter);
        if (filterList[filter].length === 0) {
          return null;
        }
        return (
          <>
            <Chip
              key={key}
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
          <LinkButton
            appearance="transparent"
            aria-label="Re-evaluate"
            onClick={() => updateFilterList({})}
          >
            Clear filters
          </LinkButton>
        </div>
      )}

      {Object.keys(filterList).length > 0 && (
        <SavedFilterView
          filterList={filterList}
          savedFilterList={savedFilterList}
          updateSavedFilterList={updateSavedFilterList}
        />
      )}
    </div>
  );
};

export default HeaderFilters;
