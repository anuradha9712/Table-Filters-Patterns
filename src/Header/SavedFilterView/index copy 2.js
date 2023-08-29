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
  Grid,
  List,
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
  console.log("savedFilterList", savedFilterList);
  const headerOptions = {
    heading: "Saved filter views",
  };

  const options = {
    open: openSidesheet,
    onClose,
    headerOptions,
  };

  const applyFilterHandler = (filterItem) => {
    console.log("filterItem in apply handler", filterItem);
    updateFilterList(filterItem.filterList);
    onClose();
  };

  const schema = [
    {
      name: "filterName",
      displayName: "filterName",
      width: "75%",
      cellType: "WITH_META_LIST",
      sorting: false,
      translate: (a) => ({
        title: a.filterName,
        metaList: [`${a.filterDesc}`],
      }),
    },
    {
      name: "filterDesc",
      displayName: "filterDesc",
      cellType: "DEFAULT",
      width: "25%",
      sorting: false,

      cellRenderer: (props) => {
        console.log("propsaa", props);
        // const {}
        return (
          <div className="d-flex align-items-center justify-content-end flex-grow-1">
            <Text appearance="subtle" className="mr-5">
              {getDisplayDate(props?.data?.created_date)}
            </Text>
            <div>
              <ContextMenu
                filterItem={props?.data}
                savedFilterList={savedFilterList}
                updateSavedFilterList={updateSavedFilterList}
              />
            </div>
          </div>
        );
      },
      align: "right",
    },
  ];

  return (
    <div>
      <Sidesheet {...options}>
        <Card shadow="none" className="mt-5 pt-5">
          <List
            type="resource"
            withHeader={true}
            headerOptions={{
              withSearch: true,
              dynamicColumn: false,
            }}
            loading={!options.open}
            separator={false}
            showMenu={false}
            data={savedFilterList}
            schema={schema}
            withPagination={true}
            pageSize={5}
            onSearch={(currData, searchTerm) => {
              return currData.filter((d) =>
                d.filterName.toLowerCase().match(searchTerm.toLowerCase())
              );
            }}
            onRowClick={applyFilterHandler}
            // onRowClick={(rowData, rowIndex) =>
            //   console.log(
            //     `on-row-click:- rowIndex: ${rowIndex} data: ${JSON.stringify(
            //       rowData
            //     )}`
            //   )
            // }
          />
        </Card>
      </Sidesheet>
    </div>
  );
};
