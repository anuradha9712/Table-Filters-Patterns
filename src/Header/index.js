import React from "react";
import { Button, Tooltip } from "@innovaccer/design-system";
import HeaderFilters from "./HeaderFilters";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderButton } from "./HeaderButton";
import { SavedFilterView } from "./SavedFilterView";
import "../style.css";

const getButtonPosition = () => {
  const headerButton = document.getElementById("header-quick-filters");
  const headerButtonWidth = headerButton && headerButton.getClientRects()[0]?.left;
  return headerButtonWidth;
};

export const Header = (props) => {
  const { showVerticalFilters } = props;
  const [savedFilterList, setSavedFilterList] = React.useState([]);
  const [openSidesheet, setOpenSidesheet] = React.useState(false);
  const [buttonPosition, setButtonPosition] = React.useState();

  React.useEffect(() => {
    setButtonPosition(getButtonPosition())
  }, [showVerticalFilters]);

  const keyframe = `
    @keyframes slidePanelRight {
      from {
        right: ${buttonPosition}px;
      }
      to {
        right: 0;
      }
    }

    @keyframes slidePanelLeft {
      from {
        left: ${buttonPosition}px;
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
