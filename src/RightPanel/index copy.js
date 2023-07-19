import React from "react";
import {
  Subheading,
  Icon,
  Label,
  Button,
  Dropdown,
  DatePicker
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
  const optionList = filterChoiceList(filterList, onFilterChange, loading);
  const newOptionList = newFilterList(onFilterChange, loading);

  const [filterOptionList, setFilterOptionList] = React.useState(optionList);
  const [customFilterList, setCustomFilterList] = React.useState([]);

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
    const list = [...filterOptionList];
    newOptionList.forEach((filterItem) => {
      if (selected.includes(filterItem.label)) {
        list.push(filterItem);
      }
    });
    console.log("list", list);
    setFilterOptionList(list);
  }

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
