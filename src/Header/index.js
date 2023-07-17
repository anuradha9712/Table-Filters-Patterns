import React from "react";
import { Button } from "@innovaccer/design-system";
import { HeaderSearch } from "./HeaderSearch";
import HeaderFilters from "./HeaderFilters";
import '../style.css';

export const Header = (props) => {
  return (
    <div>
      <div className="d-flex mb-4 w-50 Header-wrapper">
        <HeaderSearch />
        <Button icon="add" onClick={props.toggleVerticalFilter}>
          More Filters
        </Button>
      </div>
      <HeaderFilters {...props} />
    </div>
  );
};
