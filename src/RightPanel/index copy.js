import React from "react";
import {
  Subheading,
  Icon,
  Label,
  Dropdown,
  Button,
} from "@innovaccer/design-system";
import { staticFilterList, dynamicFilterList } from "./data";
import "../style.css";

export const RightPanel = ({
  showVerticalFilters,
  onCloseHandler,
  onFilterChange,
  filterList,
  loading
}) => {

  const [selectedFilterList, setSelectedFilterList] = React.useState([]);
  const newOptionList = dynamicFilterList(onFilterChange, loading);

  const onNewFilterAddition = (selected) => {
    const list = [];
    newOptionList.forEach((filterItem) => {
      if (selected.includes(filterItem.label)) {
        list.push(filterItem);
      }
    });
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

      <div className="py-5">
        {selectedFilterList.map((filterOption, key) => {
          const { label, props, element } = filterOption;
          const Element = element;
          return (
            <div className="mb-5" key={key}>
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
        className="mt-6"
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
