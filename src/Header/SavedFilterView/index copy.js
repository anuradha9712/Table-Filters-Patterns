import React from "react";
import {
  Sidesheet,
  Card,
  Input,
  Label,
  Divider,
  Text,
  Button,
  Modal,
  Dropdown,
} from "@innovaccer/design-system";
import "../../style.css";
import { getDisplayDate } from "./utils";

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

  const onChangeHandler = (selectedOption) => {
    if (selectedOption === "edit") {
      onEditHandler();
    } else if (selectedOption === "delete") {
      onDeleteHandler();
    }
  };

  return (
    <>
      <Dropdown
        menu={true}
        className="w-25"
        optionType="WITH_ICON"
        onChange={onChangeHandler}
        align="left"
        options={[
          {
            icon: "edit",
            label: "Edit details",
            value: "edit",
          },
          { icon: "delete", label: "Delete", value: "delete" },
        ]}
      />

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
                    <Text appearance="subtle" className="mr-5 w-100">
                      {getDisplayDate(filterItem.created_date)}
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
