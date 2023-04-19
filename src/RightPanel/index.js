import React from "react";
import {
  Dropdown,
  Subheading,
  Icon,
  DatePicker,
  Label,
} from "@innovaccer/design-system";
import { TableContext } from "../TableContext";

export const RightPanel = ({
  showVerticalFilters,
  loading,
  onCloseHandler,
}) => {
  const contextProp = React.useContext(TableContext);
  const { filterList, updateFilterList } = contextProp;

  const onFilterChange = (name, selected) => {
    const newFilterList = {
      ...filterList,
      [name]: selected,
    };

    updateFilterList(newFilterList);
  };

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
        <div className="Table-filter">
          <Label className="mb-3">Name</Label>
          <Dropdown
            key="name"
            disabled={loading}
            withCheckbox={true}
            showApplyButton={true}
            inlineLabel={"Name"}
            options={[
              { label: "A-G", value: "a-g", selected: true },
              { label: "H-R", value: "h-r", selected: true },
              { label: "S-Z", value: "s-z", selected: true },
            ]}
            onChange={(selected) => onFilterChange("name", selected)}
          />
        </div>
        <div className="Table-filter">
          <Label className="mb-3">Gender</Label>
          <Dropdown
            key="gender"
            disabled={loading}
            withCheckbox={true}
            showApplyButton={true}
            inlineLabel={"Gender"}
            options={[
              { label: "Male", value: "male", selected: true },
              { label: "Female", value: "female", selected: true },
            ]}
            onChange={(selected) => onFilterChange("gender", selected)}
          />
        </div>
        <div className="Table-filter">
          <Label className="mb-3">Type</Label>
          <Dropdown
            key="type"
            disabled={loading}
            withCheckbox={true}
            showApplyButton={true}
            inlineLabel={"Type"}
            options={[
              {
                label: "Batch Execution",
                value: "Batch Execution",
                selected: true,
              },
              {
                label: "Test Function",
                value: "Test Function",
                selected: true,
              },
            ]}
            onChange={(selected) => onFilterChange("type", selected)}
          />
        </div>

        <div className="Table-filter">
          <Label className="mb-3">Status</Label>
          <Dropdown
            key="status"
            disabled={loading}
            withCheckbox={true}
            showApplyButton={true}
            inlineLabel={"Status"}
            options={[
              { label: "Completed", value: "Completed", selected: true },
              { label: "Failed", value: "Failed", selected: true },
            ]}
            onChange={(selected) => onFilterChange("status", selected)}
          />
        </div>

        <div className="Table-filter">
          <Label className="mb-3">Department</Label>
          <Dropdown
            key="department"
            disabled={loading}
            withCheckbox={true}
            showApplyButton={true}
            inlineLabel={"Department"}
            options={[
              { label: "Claims", value: "Claims", selected: true },
              { label: "Quality", value: "Quality", selected: true },
              {
                label: "Risk Analysis",
                value: "Risk Analysis",
                selected: true,
              },
            ]}
            onChange={(selected) => onFilterChange("department", selected)}
          />
        </div>

        <div className="Table-filter">
          <Label className="mb-3">Priority</Label>
          <Dropdown
            key="priority"
            disabled={loading}
            withCheckbox={true}
            showApplyButton={true}
            inlineLabel={"Priority"}
            options={[
              { label: "Subacute", value: "Subacute", selected: true },
              { label: "Urgent", value: "Urgent", selected: true },
              {
                label: "Routine",
                value: "Routine",
                selected: true,
              },
            ]}
            onChange={(selected) => onFilterChange("priority", selected)}
          />
        </div>

        {/* <div className="Table-filter">
          <DatePicker
            withInput={true}
            label="Date"
            inputOptions={{
              placeholder: "mm/dd/yyyy",
              disabled: loading,
              minWidth: "unset",
            }}
            onDateChange={(_date, dateStr) => onFilterChange("date", dateStr)}
          />
        </div> */}
      </div>
    </div>
  );
};

export default RightPanel;
