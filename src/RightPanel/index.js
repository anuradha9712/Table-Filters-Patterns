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
  filterList,
  loading,
  updateFilterList,
}) => {
  const [selectedFilterList, setSelectedFilterList] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState({});
  const [pinnedFilters, setPinnedFilters] = React.useState([]);
  let displayFilterList = [];
  let pinnedFilterList = [];

  staticFilterList.forEach((filterItem) => {
    if (!pinnedFilters.includes(filterItem.optionKey)) {
      displayFilterList.push(filterItem);
    } else {
      pinnedFilterList.push(filterItem);
    }
  });

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
    const newList = selectedFilterList.filter((filterOption) => {
      return filterOption.label !== label;
    });

    const updatedList = { ...filterList };
    delete updatedList[value];
    updateFilterList(updatedList);

    setSelectedFilterList(newList);
  };

  const pinnedFilterHandler = (optionKey) => {
    let pinnedList = [...pinnedFilters];
    if (pinnedFilters.includes(optionKey)) {
      pinnedList = pinnedList.filter((pinnedItem) => pinnedItem !== optionKey);
    } else {
      pinnedList.push(optionKey);
    }
    setPinnedFilters(pinnedList);
  };

  const onFilterChangeHandler = (name, selected) => {
    const newSelectedOption = {
      ...selectedOption,
      [name]: selected,
    };
    setSelectedOption(newSelectedOption);
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

      {pinnedFilterList.map((listItem, key) => {
        const { inlineLabel, optionKey, optionList } = listItem;
        return (
          <div className="py-4" key={key}>
            <div className="d-flex align-items-center mb-3">
              <Label>{inlineLabel}</Label>
              <Icon
                size={12}
                name="push_pin"
                appearance="accent1"
                className="ml-3 cursor-pointer"
                onClick={() => pinnedFilterHandler(optionKey)}
              />
            </div>
            <Dropdown
              disabled={loading}
              withCheckbox={true}
              showApplyButton={true}
              inlineLabel={inlineLabel}
              key={filterList[optionKey]}
              onChange={(selected) =>
                onFilterChangeHandler(optionKey, selected)
              }
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

      {displayFilterList.map((listItem, key) => {
        const { inlineLabel, optionKey, optionList } = listItem;
        return (
          <div className="py-4" key={key}>
            <div className="d-flex align-items-center mb-3 FilterLabel">
              <Label>{inlineLabel}</Label>
              <Icon
                size={12}
                name="push_pin"
                appearance="subtle"
                className="ml-3 cursor-pointer FilterLabel-pinnedIcon"
                onClick={() => pinnedFilterHandler(optionKey)}
              />
            </div>
            <Dropdown
              disabled={loading}
              withCheckbox={true}
              showApplyButton={true}
              inlineLabel={inlineLabel}
              key={filterList[optionKey]}
              onChange={(selected) =>
                onFilterChangeHandler(optionKey, selected)
              }
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
                      onFilterChangeHandler(value, dateStr);
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

      <div className="d-flex justify-content-between mt-4">
        <Button
          onClick={() => updateFilterList({})}
          appearance="transparent"
        >
          Reset values
        </Button>
        <Button onClick={() => updateFilterList(selectedOption)}>
          Apply filters
        </Button>
      </div>
    </div>
  );
};
