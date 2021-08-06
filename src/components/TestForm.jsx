import React, {useState, useRef} from 'react';
import Select from 'react-select';
import {useDispatch} from 'react-redux';

import {libraryActions} from '../store/librarySlice';

const TestForm = () => {
  const dispatch = useDispatch ();
  const libNameRef = useRef ();

  const [dynamicPlan, setDynamicPlan] = useState ([
    {
      id: Math.random (),
      name: '',
      amount: '',
      type: {value: 'Morning', label: 'Morning'},
      duration: '',
    },
  ]);

  const planTypeOptions = [
    {value: 'Morning', label: 'Morning'},
    {value: 'Afternoon', label: 'Afternoon'},
    {value: 'Evening', label: 'Evening'},
    {value: 'Night', label: 'Night'},
    {value: 'Full Day', label: 'Full Day'},
  ];

  const submitHandler = e => {
    e.preventDefault ();

    if (libNameRef.current.value === '') {
      alert ('please enter library name');
      return;
    }

    const newPlanList = [...dynamicPlan];
    newPlanList.map ((plan, key) => {
      newPlanList[key].type = plan.type.value;
    });

    const fullData = {
      id: Math.random (),
      name: libNameRef.current.value,
      plans: newPlanList,
    };

    dispatch (libraryActions.addLibrary (fullData));
  };

  const onChangePlan = (name, value, index) => {
    const list = [...dynamicPlan];
    list[index][name] = value;
    setDynamicPlan (list);
  };

  const addNewPlan = () => {
    setDynamicPlan ([
      ...dynamicPlan,
      {
        id: Math.random (),
        name: '',
        amount: '',
        type: {value: 'Morning', label: 'Morning'},
        duration: '',
      },
    ]);
  };

  const removePlan = index => {
    let newList = [...dynamicPlan];
    newList.splice (index, 1);
    setDynamicPlan (newList);
  };

  const getPlanType = type => {
    return planTypeOptions.find (p => p.value === type);
  };

  return (
    <div className="form">

      <form onSubmit={submitHandler}>

        <div className="form-group">
          <label htmlFor="text">Library Name</label>
          <input
            id="text"
            className="form-control"
            type="text"
            name="libraryName"
            ref={libNameRef}
          />
        </div>

        {dynamicPlan.map ((plan, key) => (
          <div className="plans" key={key}>
            <div className="form-group">
              <label htmlFor="planType">Plan Type</label>
              <Select
                id="type"
                defaultValue={planTypeOptions[0]}
                options={planTypeOptions}
                onChange={(e, action) => onChangePlan (action.name, e, key)}
                name="type"
                value={plan.type}
                // plan.type && getPlanType (plan.type)
              />
            </div>
            <div className="form-group">
              <label>Plan Name</label>
              <input
                className="form-control"
                onChange={e =>
                  onChangePlan (e.target.name, e.target.value, key)}
                type="text"
                name="name"
                value={plan.name}
              />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                className="form-control"
                onChange={e =>
                  onChangePlan (e.target.name, e.target.value, key)}
                type="text"
                name="amount"
                value={plan.amount}
              />
            </div>
            <div className="form-group">
              <label>Duration in Days</label>
              <input
                className="form-control"
                onChange={e =>
                  onChangePlan (e.target.name, e.target.value, key)}
                type="text"
                name="duration"
                value={plan.duration}
              />
            </div>
            <div
              className="btn btn-danger mt-2"
              onClick={() => removePlan (key)}
            >
              Remove plan
            </div>
          </div>
        ))}

        <div className="btn btn-success " onClick={addNewPlan}>
          Add Plan
        </div>
        <input className="btn btn-primary ml-4" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default TestForm;
