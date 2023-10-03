import React from "react";
import { Button, Tooltip } from "@innovaccer/design-system";
import { HeaderSearch } from "./HeaderSearch";
import HeaderFilters from "./HeaderFilters";
import { HeaderButton } from "./HeaderButton";
import { SavedFilterView } from "./SavedFilterView";
import classNames from "classnames";
import "../style.css";

export const Header = (props) => {
  const { filterList } = props;
  const [savedFilterList, setSavedFilterList] = React.useState([]);
  const [openSidesheet, setOpenSidesheet] = React.useState(false);
  const filterLength = Object.keys(filterList).length;

  const wrapperClass = classNames({
    "Header-wrapper-slideDown": filterLength > 0,
    "Header-wrapper-slideUp": filterLength <= 0,
  });

  return (
    <div className={wrapperClass}>
      <div className="d-flex mb-4 w-50 Header-wrapper">
        <HeaderSearch updateSearchTerm={props.updateSearchTerm} />
        <HeaderButton {...props} />
        {savedFilterList.length === 0 ? (
          <Tooltip tooltip="No saved filter views">
            <Button
              icon="list"
              className="ml-4"
              onClick={() => setOpenSidesheet(true)}
              disabled={true}
            >
              Filter views
            </Button>
          </Tooltip>
        ) : (
          <Button
            icon="list"
            className="ml-4"
            onClick={() => setOpenSidesheet(true)}
          >
            Filter views
          </Button>
        )}
      </div>
      <HeaderFilters
        {...props}
        savedFilterList={savedFilterList}
        updateSavedFilterList={setSavedFilterList}
      />
      {openSidesheet && (
        <SavedFilterView
          openSidesheet={openSidesheet}
          savedFilterList={savedFilterList}
          onClose={() => setOpenSidesheet(false)}
          updateSavedFilterList={setSavedFilterList}
          updateFilterList={props.updateFilterList}
        />
      )}
    </div>
  );
};
