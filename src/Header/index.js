import React from "react";
import { Button, Tooltip } from "@innovaccer/design-system";
import { HeaderSearch } from "./HeaderSearch";
import HeaderFilters from "./HeaderFilters";
import { HeaderButton } from "./HeaderButton";
import { SavedFilterView } from "./SavedFilterView";
import { ColumnSelection } from "./ColumnSelection";
import "../style.css";

export const Header = (props) => {
  const [savedFilterList, setSavedFilterList] = React.useState([]);
  const [openSidesheet, setOpenSidesheet] = React.useState(false);

  return (
    <div>
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
      <ColumnSelection {...props} />
      {/* <div className="d-flex mt-4 justify-content-center align-items-center">
        <div className="flex-grow-1">
          {showHead && !loading && (
            <Checkbox
              {...selectAll}
              onChange={(event) => {
                if (onSelectAll) onSelectAll(event.target.checked);
              }}
            />
          )}
          {loading ? (
            <Placeholder withImage={!showHead && withCheckbox}>
              <PlaceholderParagraph length={"small"} size={"s"} />
            </Placeholder>
          ) : (
            <div>
              <Label>{label}</Label>
              {withPagination && selectAll.checked && allowSelectAll && (
                <div className="ml-4">
                  {!selectAllRecords ? (
                    <Button
                      size="tiny"
                      onClick={() => setSelectAllRecords(true)}
                    >
                      {`Select all totalRecords} items`}
                    </Button>
                  ) : (
                    <Button
                      size="tiny"
                      onClick={() => setSelectAllRecords(false)}
                    >
                      Clear Selection
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          <DraggableDropdown
            options={columnOptions}
            onChange={onDynamicColumnUpdate}
          />
        </div>
      </div> */}
    </div>
  );
};
