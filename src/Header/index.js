import React from "react";
import { Button } from "@innovaccer/design-system";
import { HeaderSearch } from "./HeaderSearch";
import HeaderFilters from "./HeaderFilters";
import '../style.css';

export const Header = (props) => {

  const [savedFilterList, setSavedFilterList] = React.useState([]);
  console.log("savedFilterList", savedFilterList);

  return (
    <div>
      <div className="d-flex mb-4 w-50 Header-wrapper">
        <HeaderSearch />
        <Button
          icon="add"
          className="ml-6"
          onClick={props.toggleVerticalFilter}
        >
          More Filters
        </Button>
        {savedFilterList.length > 0 && (
          <Button
            icon="list"
            className="ml-6"
            // onClick={props.toggleVerticalFilter}
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
    </div>
  );
};
