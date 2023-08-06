import React from "react";
import {
  Sidesheet,
  Card,
  Input,
  Label,
  Divider,
  Text,
  Button,
  Popover,
  Icon,
  Modal,
} from "@innovaccer/design-system";
import "../../style.css";

const EditModal = ({
  filterItem,
  onClose,
  showEditModal,
  savedFilterList,
  updateSavedFilterList,
}) => {
  const [filterName, setFilterName] = React.useState(filterItem.filterName);
  const [filterDesc, setFilterDesc] = React.useState(filterItem.filterDesc);

  const onFilterUpdate = () => {
    const updatedList = savedFilterList.map((filter) => {
      if (filterItem.filterId === filter.filterId) {
        filter.filterName = filterName;
        filter.filterDesc = filterDesc;
      }

      return filter;
    });

    updateSavedFilterList(updatedList);
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      open={showEditModal}
      backdropClose={true}
      headerOptions={{
        heading: "Filter view details",
      }}
      footer={
        <>
          <Button appearance="basic" onClick={onClose}>
            Cancel
          </Button>
          <Button
            appearance="primary"
            className="ml-4"
            onClick={onFilterUpdate}
          >
            Update
          </Button>
        </>
      }
    >
      <Label withInput={true}>Name</Label>
      <Input
        placeholder="Enter name"
        className="mb-6"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
      />

      <Label withInput={true} optional={true}>
        Description
      </Label>
      <Input
        placeholder="Enter a description..."
        className="mb-4"
        value={filterDesc}
        onChange={(e) => setFilterDesc(e.target.value)}
      />
    </Modal>
  );
};

const ContextMenu = ({
  filterItem,
  updateSavedFilterList,
  savedFilterList,
}) => {
  const [showEditModal, setShowEditModal] = React.useState(false);

  const onEditHandler = () => {
    setShowEditModal(true);
  };

  const onClose = () => {
    setShowEditModal(!showEditModal);
  };

  const onDeleteHandler = () => {
    const updatedList = savedFilterList.filter((filter) => {
      return filterItem.filterId !== filter.filterId;
    });

    updateSavedFilterList(updatedList);
  };

  return (
    <>
      <Popover
        className="pl-5 pr-4 py-3 Menu-Dropdown-Wrapper"
        position="bottom-end"
        trigger={
          <Button
            aria-label="Menu"
            icon="more_horiz"
            appearance="transparent"
          />
        }
      >
        <div
          className="d-flex align-items-center cursor-pointer Menu-Dropdown-Option"
          onClick={onEditHandler}
        >
          <Icon name="edit" size={16} className="mr-4" />
          <Text>Edit details</Text>
        </div>
        <div
          className="d-flex align-items-center cursor-pointer Menu-Dropdown-Option"
          onClick={onDeleteHandler}
        >
          <Icon name="delete" size={16} className="mr-4" />
          <Text>Delete</Text>
        </div>
      </Popover>
      <EditModal
        filterItem={filterItem}
        onClose={onClose}
        showEditModal={showEditModal}
        savedFilterList={savedFilterList}
        updateSavedFilterList={updateSavedFilterList}
      />
    </>
  );
};

export const SavedFilterView = ({
  openSidesheet,
  onClose,
  savedFilterList,
  updateSavedFilterList,
  updateFilterList,
}) => {
  const headerOptions = {
    heading: "Saved filter views",
  };

  const options = {
    open: openSidesheet,
    onClose,
    headerOptions,
  };

  const applyFilterHandler = (filterItem) => {
    updateFilterList(filterItem.filterList);
    onClose();
  };

  return (
    <div>
      <Sidesheet {...options}>
        <Card shadow="none" className="mt-5 pt-5">
          <div className="ml-5">
            <Input
              className="w-25"
              icon="search"
              name="input"
              onChange={function () {}}
              placeholder="Search"
            />
            <Label className="mt-6 mb-4">
              {`Showing ${savedFilterList.length} items`}
            </Label>
          </div>
          <Divider appearance="header" />
          {savedFilterList.map((filterItem, key) => {
            return (
              <div
                key={key}
                className="cursor-pointer"
                onClick={() => applyFilterHandler(filterItem)}
              >
                <div className="p-5 d-flex justify-content-between">
                  <div>
                    <Text>{filterItem.filterName}</Text>
                    <br />
                    <Text appearance="subtle">{filterItem.filterDesc}</Text>
                  </div>

                  <div className="d-flex align-items-center">
                    <Text appearance="subtle" className="mr-5">
                      few mins ago
                    </Text>
                    <ContextMenu
                      filterItem={filterItem}
                      savedFilterList={savedFilterList}
                      updateSavedFilterList={updateSavedFilterList}
                    />
                  </div>
                </div>
                <Divider />
              </div>
            );
          })}
        </Card>
      </Sidesheet>
    </div>
  );
};
