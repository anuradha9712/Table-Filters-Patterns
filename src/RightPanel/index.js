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
  updateFilterList,
}) => {
  const [selectedFilterList, setSelectedFilterList] = React.useState([]);

  const onNewFilterAddition = (selected) => {
    const list = [];
    dynamicFilterList(loading).forEach((filterItem) => {
      if (selected.includes(filterItem.label)) {
        list.push(filterItem);
      }
    });
    setSelectedFilterList(list);
  };

  const removeDynamicFilter = (label, value) => {
    console.log("filterList", filterList, "label", label, value);
    const newList = selectedFilterList.filter((filterOption) => {
      return filterOption.label !== label;
    });

    const updatedList = { ...filterList };
    delete updatedList[value];
    updateFilterList(updatedList);

    setSelectedFilterList(newList);
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
                <div className="d-flex justify-content-between align-items-center">
                  <Label className="mb-3">{label}</Label>
                  <Button
                    icon="delete"
                    appearance="transparent"
                    size="tiny"
                    onClick={() => removeDynamicFilter(label, value)}
                  />
                </div>
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
        className="mt-6"
        withSearch={true}
        placeholder="Select"
        withCheckbox={true}
        showApplyButton={true}
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
