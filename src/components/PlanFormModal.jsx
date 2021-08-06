import React, {Fragment, useState} from 'react';
import Modal from 'react-modal';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

import Select from 'react-select';
import {libraryActions} from '../store/librarySlice';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: '400px',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement ('#root');

const PlanFormModal = ({plan, libId, editMode}) => {
  const librarys = useSelector (state => state.library.librarys);

  const [modalIsOpen, setIsOpen] = React.useState (false);
  const dispatch = useDispatch ();

  function openModal () {
    setIsOpen (true);
  }

  function closeModal () {
    setIsOpen (false);
  }
  let initialState = {};

  if (editMode) {
    // console.log (plan);
    initialState = {
      id: plan.id,
      name: plan.name,
      amount: plan.amount,
      type: {value: plan.type, label: plan.type},
      duration: plan.duration,
    };
  } else {
    initialState = {
      id: Math.random (),
      name: '',
      amount: '',
      type: {value: 'Morning', label: 'Morning'},
      duration: '',
    };
  }

  const [newPlan, setNewPlan] = useState (initialState);

  const planTypeOptions = [
    {value: 'Morning', label: 'Morning'},
    {value: 'Afternoon', label: 'Afternoon'},
    {value: 'Evening', label: 'Evening'},
    {value: 'Night', label: 'Night'},
    {value: 'Full Day', label: 'Full Day'},
  ];

  const submitHandler = e => {
    e.preventDefault ();
    let newList = {
      ...newPlan,
      type: newPlan.type.value,
    };

    if (editMode) {
      dispatch (
        libraryActions.editPlan ({newData: newList, libId, planId: plan.id})
      );
    } else {
      dispatch (libraryActions.addNewPlan ({newData: newList, libId}));
    }
    setIsOpen (false);
  };

  const cancelHandler = e => {
    e.preventDefault ();
    setIsOpen (false);
  };

  const onChangePlan = (fieldName, value) => {
    const newList = {...newPlan};
    newList[fieldName] = value;
    setNewPlan (newList);
  };
  return (
    <Fragment>
      <button className="btn btn-primary" onClick={openModal}>
        {editMode ? 'Edit' : 'Add Plan'}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {editMode ? 'Edit Modal' : 'Add Modal'}
        <form onSubmit={submitHandler}>
          <div className="">
            <div className="form-group">
              <label htmlFor="planType">Plan Type</label>
              <Select
                id="type"
                defaultValue={planTypeOptions[0]}
                options={planTypeOptions}
                onChange={(e, action) => onChangePlan (action.name, e)}
                name="type"
                value={newPlan.type}
                // plan.type && getPlanType (plan.type)
              />
            </div>
            <div className="form-group">
              <label>Plan Name</label>
              <input
                className="form-control"
                onChange={e => onChangePlan (e.target.name, e.target.value)}
                type="text"
                name="name"
                value={newPlan.name}
              />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                className="form-control"
                onChange={e => onChangePlan (e.target.name, e.target.value)}
                type="text"
                name="amount"
                value={newPlan.amount}
              />
            </div>
            <div className="form-group">
              <label>Duration in Days</label>
              <input
                className="form-control"
                onChange={e => onChangePlan (e.target.name, e.target.value)}
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
            <div className="btn btn-danger" onClick={cancelHandler}>Cancel</div>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

export default PlanFormModal;
