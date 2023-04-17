import React from "react";
import {
  Dropdown,
  Subheading,
  Icon,
  DatePicker,
} from "@innovaccer/design-system";

export const RightPanel = ({
  showVerticalFilters,
  loading,
  onFilterChange,
  onCloseHandler,
}) => {
  return (
    <div
      className={`Table-filters Table-filters--vertical${
        !showVerticalFilters ? " d-none" : ""
      }`}
    >
      <div className="Table-filtersHeading">
        <Subheading>Filters</Subheading>
        <Icon
          name="close"
          className="Table-filtersCloseIcon"
          onClick={onCloseHandler}
        />
      </div>
      <div>
        <div className="Table-filter">
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
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
