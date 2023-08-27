import React from "react";
import { Button } from "@innovaccer/design-system";
import { HeaderSearch } from "./HeaderSearch";
import HeaderFilters from "./HeaderFilters";
import { HeaderButton } from "./HeaderButton";
import { SavedFilterView } from "./SavedFilterView";
import "../style.css";

export const Header = (props) => {
  console.log("header props", props);
  const [savedFilterList, setSavedFilterList] = React.useState([]);
  const [openSidesheet, setOpenSidesheet] = React.useState(false);

  return (
    <div>
      <div className="d-flex mb-4 w-50 Header-wrapper">
        <HeaderSearch />
        <HeaderButton {...props} />
        {savedFilterList.length > 0 && (
          <Button
            icon="list"
            className="ml-6"
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
      <SavedFilterView
        openSidesheet={openSidesheet}
        savedFilterList={savedFilterList}
        onClose={() => setOpenSidesheet(false)}
        updateSavedFilterList={setSavedFilterList}
        updateFilterList={props.updateFilterList}
      />
    </div>
  );
};
