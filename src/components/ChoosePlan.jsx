import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Select from 'react-select';

const ChoosePlan = () => {
  const librarys = useSelector (state => state.library.librarys);

  const [currentPlan, setCurrentPlan] = useState ({
    currentLibraryId: '',
    amount: '',
    duration: '',
    name: '',
    type: '',
  });

  let libraryOptions = [];

  librarys.map (plan => {
    libraryOptions.push ({
      value: plan.id,
      label: plan.name,
    });
  });

  // const [libraryOptions, setLibraryOptions] = useState (latestOptions);
  const [planOptions, setplanOptions] = useState ([]);

  const onPlanChange = e => {
    const currentLib = librarys.find (
      lib => lib.id === currentPlan.currentLibraryId
    );

    const planData = currentLib.plans.find (plan => plan.id === e.value);

    setCurrentPlan ({
      ...currentPlan,
      amount: planData.amount,
      duration: planData.duration,
      name: planData.name,
      type: planData.type,
    });
  };

  const onLibChange = e => {
    const currentLib = librarys.find (lib => lib.id === e.value);
    let latestOptions = [];

    currentLib.plans.map (plan => {
      latestOptions.push ({
        value: plan.id,
        label: `${plan.name} (${plan.type})`,
      });
    });

    setCurrentPlan ({
      ...currentPlan,
      currentLibraryId: currentLib.id,
      amount: '',
      duration: '',
      name: '',
      type: '',
    });

    setplanOptions (latestOptions);
  };

  return (
    <div>
      <div className="form">
        <div className="form-group">
          <label>Select Library </label>
          <Select
            options={libraryOptions}
            name="libName"
            onChange={e => onLibChange (e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Library">Select Plan</label>
          <Select
            options={planOptions}
            name="type"
            onChange={e => onPlanChange (e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Plan Name</label>
          <input
            id="name"
            className="form-control"
            type="text"
            name="name"
            value={currentPlan.name}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Shift</label>
          <input
            id="shift"
            className="form-control"
            type="text"
            name="name"
            value={currentPlan.type}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            className="form-control"
            type="text"
            name="amount"
            value={currentPlan.amount}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration in days</label>
          <input
            id="duration"
            className="form-control"
            type="text"
            name="duration"
            value={currentPlan.duration}
            disabled
          />
        </div>

      </div>
    </div>
  );
};

export default ChoosePlan;
