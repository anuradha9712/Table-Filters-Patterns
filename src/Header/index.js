import React from "react";
import { Button, Tooltip } from "@innovaccer/design-system";
import { HeaderSearch } from "./HeaderSearch";
import HeaderFilters from "./HeaderFilters";
import { HeaderButton } from "./HeaderButton";
import { SavedFilterView } from "./SavedFilterView";
import "../style.css";

export const Header = (props) => {
  const { showVerticalFilters } = props;
  const [savedFilterList, setSavedFilterList] = React.useState([]);
  const [openSidesheet, setOpenSidesheet] = React.useState(false);
  const headerButtonWidth = document.getElementById(
    "header-quick-filters"
  )?.clientWidth;

  const keyframe = `
    @keyframes slidePanelRight {
      from {
        right: 284px;
      }
      to {
        right: ${headerButtonWidth}px;
      }
    }

    @keyframes slidePanelLeft {
      from {
        left: 284px;
      }
      to {
        left: 0;
      }
    }
`;

  const animation = showVerticalFilters
    ? "slidePanelLeft 160ms cubic-bezier(0.2, 0, 0.38, 0.9)"
    : "slidePanelRight 120ms cubic-bezier(0.2, 0, 0.38, 0.9)";

  const styles = {
    animation,
    animationFillMode: "forwards",
  };

  return (
    <div>
      <style>{keyframe}</style>
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
              style={styles}
            >
              Filter views
            </Button>
          </Tooltip>
        ) : (
          <Button
            icon="list"
            className="ml-4"
            onClick={() => setOpenSidesheet(true)}
            style={styles}
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
