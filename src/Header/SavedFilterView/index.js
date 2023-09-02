import React from "react";
import {
  List,
  Card,
  Text,
  Modal,
  Input,
  Label,
  Button,
  Tooltip,
  Dropdown,
  Sidesheet,
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
  const [filterName, setFilterName] = React.useState(filterItem?.filterName);
  const [filterDesc, setFilterDesc] = React.useState(filterItem?.filterDesc);

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
      backdropClose={false}
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
    updateFilterList(filterItem.filterList, true);
    onClose();
  };

  const customCellRenderer = (props) => {
    const { displayDate, fullDate } = getDisplayDate(props?.data?.created_date);
    return (
      <div className="d-flex align-items-center justify-content-end flex-grow-1">
        {/* <Tooltip tooltip={fullDate} position="top"> */}
          <Text appearance="subtle" className="mr-5">
            {displayDate}
          </Text>
        {/* </Tooltip> */}
        <ContextMenu
          filterItem={props?.data}
          savedFilterList={savedFilterList}
          updateSavedFilterList={updateSavedFilterList}
        />
      </div>
    );
  };

  const schema = [
    {
      name: "filterName",
      displayName: "filterName",
      width: "75%",
      cellType: "WITH_META_LIST",
      sorting: false,
      translate: (data) => ({
        title: data.filterName,
        metaList: [`${data.filterDesc}`],
      }),
    },
    {
      name: "filterDesc",
      displayName: "filterDesc",
      cellType: "DEFAULT",
      width: "25%",
      sorting: false,
      align: "right",
      cellRenderer: customCellRenderer,
    },
  ];

  return (
    <div>
      <Sidesheet {...options}>
        <Card shadow="none" className="mt-5 pt-5">
          <List
            pageSize={5}
            type="resource"
            schema={schema}
            showMenu={false}
            withHeader={true}
            separator={false}
            withPagination={true}
            data={savedFilterList}
            loading={!options.open}
            onRowClick={applyFilterHandler}
            headerOptions={{
              withSearch: true,
              dynamicColumn: false,
            }}
            onSearch={(currData, searchTerm) => {
              return currData.filter((d) =>
                d.filterName.toLowerCase().match(searchTerm.toLowerCase())
              );
            }}
          />
        </Card>
      </Sidesheet>
    </div>
  );
};
