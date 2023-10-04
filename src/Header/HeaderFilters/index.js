import * as React from "react";
import { Chip, LinkButton, Divider } from "@innovaccer/design-system";
import { SaveFilter } from "./SaveFilter";
import classNames from "classnames";

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
  const [hideAnimation, setHideAnimation] = React.useState(false);
  const [hideChipIndex, setHideChipIndex] = React.useState(-1);

  const ref = React.useRef();

  React.useEffect(() => {
    if (ref.current) {
      setIsOverflow(ref.current.scrollWidth > ref.current.clientWidth);
    }
  }, [filterList]);

  const onChipClose = (filter) => {
    const newList = { ...filterList };
    delete newList[filter];

    const unselectedList = unselectedChipList.filter((item) => item !== filter);
    updateSelectedChipList(unselectedList);
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

  const onAnimationEndHandler = (filter) => {
    if (hideAnimation) {
      onChipClose(filter);
      setHideAnimation(false);
    }
  };

  const wrapperClass = classNames({
    "Header-filters-row": !expanded,
    "d-flex flex-wrap flex-row": expanded,
  });

  const filterLength = Object.keys(filterList).length;

  const filterRowClass = classNames({
    "d-flex align-items-center": true,
    "Filter-row--expanded": expanded,
    "Filter-row--collapsed": !expanded,
    "Header-wrapper-slideDown": filterLength > 0,
    "Header-wrapper-slideUp": filterLength <= 0,
  });

  return (
    <div className={filterRowClass}>
      <div className={wrapperClass} style={{ rowGap: "8px" }} ref={ref}>
        {Object.keys(filterList).map((filter, key) => {
          const selected = !unselectedChipList.includes(filter);
          const optionLength = filterList[filter].length;
          const filterType = typeof filterList[filter];

          const chipClass = classNames({
            "Selected-chip--hide": hideAnimation && hideChipIndex === key,
            "Selected-chip--show opacity-0": true,
            "mr-4": true,
          });

          if (optionLength === 0) {
            return null;
          }
          const label =
            optionLength > 2 && filterType !== "string"
              ? `${optionLength} selected`
              : filterList[filter].toString();
          return (
            <div
              className={chipClass}
              onAnimationEnd={() => onAnimationEndHandler(filter)}
            >
              <Chip
                key={key}
                onClick={() => onChipClick(filter)}
                onClose={() => {
                  setHideAnimation(true);
                  setHideChipIndex(key);
                }}
                label={label}
                type="selection"
                clearButton={true}
                selected={selected}
                labelPrefix={
                  filter.charAt(0).toUpperCase() + filter.slice(1) + ":"
                }
              />
            </div>
          );
        })}

        {Object.keys(filterList).length > 0 && expanded && (
          <div className="d-flex align-items-center Selected-chip--show opacity-0">
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
        <div className="d-flex align-items-center Selected-chip--show opacity-0">
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
