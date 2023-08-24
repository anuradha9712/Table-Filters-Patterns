import React from "react";
import {
  Icon,
  Label,
  Button,
  Dropdown,
  Subheading,
} from "@innovaccer/design-system";
import { staticFilterList, dynamicFilterList } from "./data";
import "../style.css";

export const RightPanel = ({
  showVerticalFilters,
  onCloseHandler,
  onFilterChange,
  filterList,
  loading,
}) => {
  const [selectedFilterList, setSelectedFilterList] = React.useState([]);
  // const filterChangeHandler = (name, value) => {
  //   console.log("ondatechange filterlisttt", filterList);

  //   onFilterChange(name, value);
  // };

  // const newOptionList = dynamicFilterList(
  //   filterChangeHandler,
  //   loading,
  //   filterList
  // );

  const onNewFilterAddition = (selected) => {
    // const list = [...selectedFilterList];
    const list = [];
    dynamicFilterList(onFilterChange, loading, filterList).forEach(
      (filterItem) => {
        if (selected.includes(filterItem.label)) {
          list.push(filterItem);
        }
      }
    );
    console.log("dynamic addedlist", list, selected);
    setSelectedFilterList(list);
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
        {staticFilterList.map((listItem, key) => {
          const { inlineLabel, optionKey, optionList } = listItem;
          return (
            <div className="py-4" key={key}>
              <Label className="mb-3">{inlineLabel}</Label>
              <Dropdown
                disabled={loading}
                withCheckbox={true}
                showApplyButton={true}
                inlineLabel={inlineLabel}
                key={filterList[optionKey]}
                onChange={(selected) => onFilterChange(optionKey, selected)}
                options={optionList.map((optionItem) => {
                  optionItem.selected = filterList[optionKey]?.includes(
                    optionItem.value
                  );
                  return optionItem;
                })}
              />
            </div>
          );
        })}
      </div>

      {selectedFilterList.length > 0 && (
        <div className="py-4">
          {selectedFilterList.map((filterOption, key) => {
            const { label, props, element, value } = filterOption;
            const Element = element;
            return (
              <div className="mb-5" key={key}>
                <Label className="mb-3">{label}</Label>
                {Element && (
                  <Element
                    {...props}
                    onDateChange={(date, dateStr) => {
                      onFilterChange(value, dateStr);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      <Dropdown
        options={[{ label: "Creation date", value: "Creation date" }]}
        placeholder="Select"
        withCheckbox={true}
        withSearch={true}
        showApplyButton={true}
        className="mt-6"
        onChange={onNewFilterAddition}
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
