import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import Select from "react-select";
import { libraryActions } from "../store/librarySlice";

Modal.setAppElement("#root");

const PlanFormModal = ({ plan, libId, editMode }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  let initialState = {};

  if (editMode) {
    // console.log (plan);
    initialState = {
      id: plan.id,
      name: plan.name,
      amount: plan.amount,
      type: { value: plan.type, label: plan.type },
      duration: plan.duration,
    };
  } else {
    initialState = {
      id: Math.random(),
      name: "",
      amount: "",
      type: { value: "Morning", label: "Morning" },
      duration: "",
    };
  }

  const [newPlan, setNewPlan] = useState(initialState);

  const planTypeOptions = [
    { value: "Morning", label: "Morning" },
    { value: "Afternoon", label: "Afternoon" },
    { value: "Evening", label: "Evening" },
    { value: "Night", label: "Night" },
    { value: "Full Day", label: "Full Day" },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    let newList = {
      ...newPlan,
      type: newPlan.type.value,
    };

    if (editMode) {
      dispatch(
        libraryActions.editPlan({ newData: newList, libId, planId: plan.id })
      );
    } else {
      dispatch(libraryActions.addNewPlan({ newData: newList, libId }));
    }
    setIsOpen(false);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const onChangePlan = (fieldName, value) => {
    const newList = { ...newPlan };
    newList[fieldName] = value;
    setNewPlan(newList);
  };

  const modalClasses = {
    beforeClose: "modalContentClose",
    base: "customContent",
  };

  const overLayClasses = {
    base: "customOverlay",
    beforeClose: "overlayClose",
    afterOpen: "overlayOpen",
  };

  return (
    <Fragment>
      <button className="btn btn-primary" onClick={openModal}>
        {editMode ? "Edit" : "Add Plan"}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // style={customStyles}
        // overlayClassName="customOverlay"
        overlayClassName={overLayClasses}
        // className="customContent"
        className={modalClasses}
        closeTimeoutMS={300}
      >
        {editMode ? "Edit Modal" : "Add Modal"}
        <form onSubmit={submitHandler}>
          <div className="plan-modal-form">
            <div className="form-group">
              <label htmlFor="planType">Plan Type</label>
              <Select
                id="type"
                defaultValue={planTypeOptions[0]}
                options={planTypeOptions}
                onChange={(e, action) => onChangePlan(action.name, e)}
                name="type"
                value={newPlan.type}
              />
            </div>
            <div className="form-group">
              <label>Plan Name</label>
              <input
                className="form-control"
                onChange={(e) => onChangePlan(e.target.name, e.target.value)}
                type="text"
                name="name"
                value={newPlan.name}
              />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                className="form-control"
                onChange={(e) => onChangePlan(e.target.name, e.target.value)}
                type="text"
                name="amount"
                value={newPlan.amount}
              />
            </div>
            <div className="form-group">
              <label>Duration in Days</label>
              <input
                className="form-control"
                onChange={(e) => onChangePlan(e.target.name, e.target.value)}
                type="text"
                name="duration"
                value={newPlan.duration}
              />
            </div>

            <input
              className="btn btn-primary ml-4"
              type="submit"
              value="Submit"
            />
            <div className="btn btn-danger" onClick={cancelHandler}>
              Cancel
            </div>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

export default PlanFormModal;
