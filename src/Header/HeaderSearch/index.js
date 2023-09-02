import React from "react";
import { Input } from "@innovaccer/design-system";

export const HeaderSearch = ({ updateSearchTerm, searchTerm }) => {
  return (
    <Input
      name="TableHeader-search"
      icon="search"
      value={searchTerm}
      placeholder="Search"
      onChange={(e) => {
        updateSearchTerm(e.target.value);
      }}
      onClear={() => {
        updateSearchTerm("");
      }}
    />
  );
};
