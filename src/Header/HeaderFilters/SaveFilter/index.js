import React from "react";
import {
  LinkButton,
  Modal,
  Label,
  Button,
  Input,
  // Toast,
} from "@innovaccer/design-system";

export const SaveFilter = ({
  filterList,
  savedFilterList,
  updateSavedFilterList,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [filterName, setFilterName] = React.useState("");
  const [filterDesc, setFilterDesc] = React.useState("");
  // const [showToast, setShowToast] = React.useState(false);

  const onClose = () => {
    setShowModal(!showModal);
  };

  const onFilterSave = () => {
    const list = {
      filterName,
      filterDesc,
      filterList,
      created_date: new Date(),
      filterId: Math.random().toString(36).substring(2, 6)
    };
    updateSavedFilterList([...savedFilterList, list]);
    onClose();
    // setShowToast(true);
  };

  return (
    <div className="ml-6">
      <LinkButton onClick={() => setShowModal(!showModal)}>
        Save as filter view
      </LinkButton>
      <Modal
        onClose={onClose}
        open={showModal}
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
              onClick={onFilterSave}
            >
              Save
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
      {/* {showToast && (
        <Toast
          appearance="success"
          message='You can find this view later in the "saved filter views" list.'
          title="Saved filter view"
        />
      )} */}
    </div>
  );
};
