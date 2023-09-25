import * as React from "react";
import { Chip, LinkButton, Divider } from "@innovaccer/design-system";
import { SaveFilter } from "./SaveFilter";

export const HeaderFilters = ({
  filterList,
  updateFilterList,
  updateSelectedChipList,
  unselectedChipList,
  savedFilterList,
  updateSavedFilterList,
}) => {
  const [isOverflow, setIsOverflow] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const ref = React.useRef();

  React.useEffect(() => {
    if (ref.current) {
      setIsOverflow(ref.current.scrollWidth > ref.current.clientWidth);
    }
  }, [filterList]);

  const onChipClose = (filter) => {
    const newList = { ...filterList };
    delete newList[filter];
    updateFilterList(newList);
  };

  const onChipClick = (filter) => {
    if (unselectedChipList.includes(filter)) {
      let newList = unselectedChipList.filter((item) => item !== filter);
      updateSelectedChipList(newList);
    } else {
      updateSelectedChipList([...unselectedChipList, filter]);
    }
  };

  return (
    <div className="d-flex align-items-center">
      <div
        className={`${
          !expanded ? "Header-filters-row" : "d-flex flex-wrap flex-row"
        }`}
        style={{ rowGap: "8px" }}
        ref={ref}
      >
        {Object.keys(filterList).map((filter, key) => {
          const selected = !unselectedChipList.includes(filter);
          const optionLength = filterList[filter].length;
          const filterType = typeof filterList[filter];

          if (optionLength === 0) {
            return null;
          }
          const label =
            optionLength > 2 && filterType !== 'string'
              ? `${optionLength} selected`
              : filterList[filter].toString();
          return (
            <div
              style={{ animationDelay: key * 80 + "ms" }}
              className="Selected-chip--show opacity-0"
            >
              <Chip
                key={key}
                onClick={() => onChipClick(filter)}
                onClose={() => onChipClose(filter)}
                selected={selected}
                type="selection"
                clearButton={true}
                label={label}
                labelPrefix={
                  filter.charAt(0).toUpperCase() + filter.slice(1) + ":"
                }
                className="mr-4"
              />
            </div>
          );
        })}

        {Object.keys(filterList).length > 0 && expanded && (
          <div className="d-flex align-items-center">
            {/* <Divider vertical={true} className="Chip-separator" /> */}
            <LinkButton
              appearance="transparent"
              aria-label="Re-evaluate"
              onClick={() => setExpanded(false)}
              className="mx-4"
              subtle={true}
            >
              View less
            </LinkButton>

            <div className="border-left pl-4 d-flex align-items-center">
              <LinkButton
                appearance="transparent"
                aria-label="Re-evaluate"
                onClick={() => updateFilterList({})}
              >
                Clear filters
              </LinkButton>
              <SaveFilter
                filterList={filterList}
                savedFilterList={savedFilterList}
                updateSavedFilterList={updateSavedFilterList}
              />
            </div>
          </div>
        )}
      </div>

      {Object.keys(filterList).length > 0 && !expanded && (
        <div className="d-flex align-items-center Group-actions-button">
          {/* <Divider
            vertical={true}
            data-test="view all divider"
            className="Chip-separator"
          /> */}
          {isOverflow && (
            <LinkButton
              appearance="transparent"
              aria-label="View more"
              onClick={() => setExpanded(true)}
              className="mx-4"
              subtle={true}
            >
              {`View all ${Object.keys(filterList).length}`}
            </LinkButton>
          )}
          <div className="border-left pl-4 d-flex align-items-center">
            <LinkButton
              appearance="transparent"
              aria-label="Clear filters"
              onClick={() => updateFilterList({})}
            >
              Clear filters
            </LinkButton>
            <SaveFilter
              filterList={filterList}
              savedFilterList={savedFilterList}
              updateSavedFilterList={updateSavedFilterList}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderFilters;
