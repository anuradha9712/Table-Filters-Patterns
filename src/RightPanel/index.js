import React from "react";
import { Subheading, Icon, Label, Dropdown } from "@innovaccer/design-system";
import "../style.css";

export const RightPanel = ({
  showVerticalFilters,
  onCloseHandler,
  onFilterChange,
  filterList,
  loading
}) => {

  return (
    <div
      className={`Table-filters Table-filters--vertical bg-secondary-lightest${
        !showVerticalFilters ? " d-none" : ""
      }`}
    >
      <div className="d-flex align-items-center justify-content-between pt-5 mb-7">
        <Subheading>Filters</Subheading>
        <Icon
          name="close"
          className="cursor-pointer"
          onClick={onCloseHandler}
        />
      </div>

      <div>
        <div className="pt-5 pb-4">
          <Label className="mb-3">Name</Label>
          <Dropdown
            key={filterList["name"]}
            disabled={loading}
            withCheckbox={true}
            showApplyButton={true}
            inlineLabel={"Name"}
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
            onChange={(selected) => onFilterChange("name", selected)}
          />
        </div>

        <div className="py-4">
          <Label className="mb-3">Gender</Label>
          <Dropdown
            key={filterList["gender"]}
            disabled={loading}
            withCheckbox={true}
            showApplyButton={true}
            inlineLabel={"Gender"}
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
            onChange={(selected) => onFilterChange("gender", selected)}
          />
        </div>

        <div className="py-4">
          <Label className="mb-3">Type</Label>
          <Dropdown
            key={filterList["type"]}
            disabled={loading}
            withCheckbox={true}
            showApplyButton={true}
            inlineLabel={"Type"}
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
            onChange={(selected) => onFilterChange("type", selected)}
          />
        </div>

        <div className="py-4">
          <Label className="mb-3">Status</Label>
          <Dropdown
            key={filterList["status"]}
            disabled={loading}
            withCheckbox={true}
            showApplyButton={true}
            inlineLabel={"Status"}
            options={[
              {
                label: "Completed",
                value: "Completed",
                selected: filterList["status"]?.includes("Completed"),
              },
              {
                label: "Failed",
                value: "Failed",
                selected: filterList["status"]?.includes("Failed"),
              },
            ]}
            onChange={(selected) => onFilterChange("status", selected)}
          />
        </div>

        <div className="py-4">
          <Label className="mb-3">Department</Label>
          <Dropdown
            key={filterList["department"]}
            disabled={loading}
            withCheckbox={true}
            showApplyButton={true}
            inlineLabel={"Department"}
            options={[
              {
                label: "Claims",
                value: "Claims",
                selected: filterList["department"]?.includes("Claims"),
              },
              {
                label: "Quality",
                value: "Quality",
                selected: filterList["department"]?.includes("Quality"),
              },
              {
                label: "Risk Analysis",
                value: "Risk Analysis",
                selected: filterList["department"]?.includes("Risk Analysis"),
              },
            ]}
            onChange={(selected) => onFilterChange("department", selected)}
          />
        </div>

        <div className="pb-5 pt-4">
          <Label className="mb-3">Priority</Label>
          <Dropdown
            key={filterList["priority"]}
            disabled={loading}
            withCheckbox={true}
            showApplyButton={true}
            inlineLabel={"Priority"}
            options={[
              {
                label: "Subacute",
                value: "Subacute",
                selected: filterList["department"]?.includes("Subacute"),
              },
              {
                label: "Urgent",
                value: "Urgent",
                selected: filterList["department"]?.includes("Urgent"),
              },
              {
                label: "Routine",
                value: "Routine",
                selected: filterList["department"]?.includes("Routine"),
              },
            ]}
            onChange={(selected) => onFilterChange("priority", selected)}
          />
        </div>
      </div>
    </div>
  );
};
