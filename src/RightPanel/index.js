import React from "react";
import {
  Subheading,
  Icon,
  Label,
  Button,
  Dropdown,
  DatePicker,
} from "@innovaccer/design-system";
import { filterChoiceList, newFilterList } from "./utils";
import "../style.css";

export const RightPanel = ({
  showVerticalFilters,
  onCloseHandler,
  onFilterChange,
  filterList,
  loading,
}) => {

  const filterChoiceList = () => {
    console.log("choicelist", filterList);
    return [
      {
        element: Dropdown,
        label: "Name",
        props: {
          key: filterList["name"],
          disabled: loading,
          withCheckbox: true,
          showApplyButton: true,
          inlineLabel: "Name",
          options: [
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
          ],
          onChange: (selected) => onFilterChange("name", selected),
        },
      },
      {
        element: Dropdown,
        label: "Gender",
        props: {
          key: filterList["gender"],
          disabled: loading,
          withCheckbox: true,
          showApplyButton: true,
          inlineLabel: "Gender",
          options: [
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
          ],
          onChange: (selected) => onFilterChange("gender", selected),
        },
      },
      {
        element: Dropdown,
        label: "Type",
        props: {
          key: filterList["type"],
          disabled: loading,
          withCheckbox: true,
          showApplyButton: true,
          inlineLabel: "Type",
          options: [
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
          ],
          onChange: (selected) => onFilterChange("type", selected),
        },
      },
      {
        element: Dropdown,
        label: "Status",
        props: {
          key: filterList["status"],
          disabled: loading,
          withCheckbox: true,
          showApplyButton: true,
          inlineLabel: "Status",
          options: [
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
          ],
          onChange: (selected) => onFilterChange("status", selected),
        },
      },
      {
        element: Dropdown,
        label: "Department",
        props: {
          key: filterList["department"],
          disabled: loading,
          withCheckbox: true,
          showApplyButton: true,
          inlineLabel: "Department",
          options: [
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
          ],
          onChange: (selected) => onFilterChange("department", selected),
        },
      },
      {
        element: Dropdown,
        label: "Priority",
        props: {
          key: filterList["priority"],
          disabled: loading,
          withCheckbox: true,
          showApplyButton: true,
          inlineLabel: "Priority",
          options: [
            {
              label: "Subacute",
              value: "Subacute",
              selected: filterList["priority"]?.includes("Subacute"),
            },
            {
              label: "Urgent",
              value: "Urgent",
              selected: filterList["priority"]?.includes("Urgent"),
            },
            {
              label: "Routine",
              value: "Routine",
              selected: filterList["priority"]?.includes("Routine"),
            },
          ],
          onChange: (selected) => onFilterChange("priority", selected),
        },
      },
    ];
  };

  // const optionList = filterChoiceList(filterList, onFilterChange, loading);
  const newOptionList = newFilterList(onFilterChange, loading);

  const [filterOptionList, setFilterOptionList] = React.useState(
    filterChoiceList()
  );
  // const [customFilterList, setCustomFilterList] = React.useState([]);

  // React.useEffect(() => {
  //   const list = [...filterOptionList];
  //   newOptionList.forEach((filterItem) => {
  //     if (customFilterList.includes(filterItem.label)) {
  //       list.push(filterItem);
  //     }
  //   });
  //   console.log("list", list);
  //   // setFilterOptionList(list);
  // }, [customFilterList, newOptionList]);

  const onNewFilterAddition = (selected) => {
    // const list = [...filterOptionList];
    const list = [];
    newOptionList.forEach((filterItem) => {
      if (selected.includes(filterItem.label)) {
        list.push(filterItem);
      }
    });
    console.log("list", list);
    // setFilterOptionList((prevFilterList) => [...prevFilterList, ...list]);
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

      <div className="py-5">
        {filterOptionList.map((filterOption) => {
          const { label, props, element } = filterOption;
          const Element = element;
          return (
            <div className="mb-5">
              <Label className="mb-3">{label}</Label>
              {Element && <Element {...props} />}
            </div>
          );
        })}
      </div>

      <Dropdown
        options={[{ label: "Creation date", value: "Creation date" }]}
        placeholder="Select"
        withCheckbox={true}
        withSearch={true}
        showApplyButton={true}
        onChange={onNewFilterAddition}
        // onChange={(selected) => setCustomFilterList(selected)}
        customTrigger={() => (
          <Button
            className="w-100"
            appearance="transparent"
            icon="expand_more"
            iconAlign="right"
          >
            Add new filter
          </Button>
        )}
      />
    </div>
  );
};
