import * as React from "react";
import { FilterChip } from "./FilterChip";
import { Button } from "@innovaccer/design-system";

export const HeaderFilters = (props) => {
  const { filterList } = props;
  const filterLength = Object.keys(filterList).length;
  console.log("clear filters", filterList, filterLength);
  return (
    <div
      className="d-flex mt-5 align-items-center flex-wrap"
      style={{ rowGap: "8px" }}
    >
      <FilterChip filterList={filterList} />
      {filterLength > 0 && (
        <div className="border-left">
          <Button appearance="transparent" aria-label="Re-evaluate">
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default HeaderFilters;
