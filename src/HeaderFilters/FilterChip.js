import * as React from "react";
import { Chip, Text } from "@innovaccer/design-system";

export const FilterChip = (props) => {
  const { filterList } = props;
  console.log("props in header chip-> ", filterList.name);
  console.log("result-> ", Object.keys(filterList));

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
    <div className="d-flex">
      {Object.keys(filterList).map((filter) => {
        console.log("filter value", filterList[filter]);
        return (
          <div>
            <Chip
              onClick={function () {}}
              onClose={function () {}}
              selected={true}
              type="selection"
              clearButton={true}
              label={getLabel(filter)}
              className="mr-4"
            />
            {/* <Chip
              onClick={function () {}}
              onClose={function () {}}
              selected={true}
              type="selection"
              clearButton={true}
              label={getLabel(filter)}
              className="mr-4"
            />
            <Chip
              onClick={function () {}}
              onClose={function () {}}
              selected={true}
              type="selection"
              clearButton={true}
              label={getLabel(filter)}
              className="mr-4"
            />
            <Chip
              onClick={function () {}}
              onClose={function () {}}
              selected={true}
              type="selection"
              clearButton={true}
              label={getLabel(filter)}
              className="mr-4"
            /> */}
          </div>
        );
      })}
    </div>
  );
};

export default FilterChip;
