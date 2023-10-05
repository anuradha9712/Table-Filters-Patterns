import React from "react";
import { Button, Dropdown } from "@innovaccer/design-system";

export const HeaderButton = ({
  loading,
  filterList,
  onFilterChange,
  toggleVerticalFilter,
  showVerticalFilters,
}) => {
  const headerClass = showVerticalFilters
    ? "Header-filters--hide"
    : "Header-filters--show";

  return (
    <div className={headerClass} id='header-quick-filters'>
      <div className="d-flex align-items-center">
        <Dropdown
          className="ml-6"
          disabled={loading}
          withCheckbox={true}
          showApplyButton={true}
          inlineLabel="Name"
          key={filterList["name"]}
          onChange={(selected) => onFilterChange("name", selected)}
          options={[
            {
              label: "A-G",
              value: "a-g",
              selected: filterList["name"]?.includes("a-g"),
            },
            {
              label: "H-R",
              value: "h-r",
              selected: filterList["name"]?.includes("h-r"),
            },
            {
              label: "S-Z",
              value: "s-z",
              selected: filterList["name"]?.includes("s-z"),
            },
          ]}
        />

        <Dropdown
          className="ml-4"
          disabled={loading}
          withCheckbox={true}
          showApplyButton={true}
          inlineLabel="Gender"
          key={filterList["gender"]}
          onChange={(selected) => onFilterChange("gender", selected)}
          options={[
            {
              label: "Male",
              value: "male",
              selected: filterList["gender"]?.includes("male"),
            },
            {
              label: "Female",
              value: "female",
              selected: filterList["gender"]?.includes("female"),
            },
          ]}
        />

        <Dropdown
          className="ml-4"
          disabled={loading}
          withCheckbox={true}
          showApplyButton={true}
          inlineLabel="Type"
          key={filterList["type"]}
          onChange={(selected) => onFilterChange("type", selected)}
          options={[
            {
              label: "Batch Execution",
              value: "Batch Execution",
              selected: filterList["type"]?.includes("Batch Execution"),
            },
            {
              label: "Test Function",
              value: "Test Function",
              selected: filterList["type"]?.includes("Test Function"),
            },
          ]}
        />
        <Button icon="add" className="ml-4" onClick={toggleVerticalFilter}>
          More Filters
        </Button>
      </div>
    </div>
  );
};
