import React, {useState, useEffect} from 'react';
import Select from 'react-select';

const librarysData = [
  {
    id: 1,
    name: 'Testing 1',
    plans: [
      {id: 1, name: 'AAA', amount: '111', type: 'Morning', duration: '11'},
      {id: 2, name: 'BBB', amount: '222', type: 'Evening', duration: '22'},
      {id: 3, name: 'CCC', amount: '333', type: 'Night', duration: '33'},
    ],
  },
  {
    id: 2,
    name: 'Testing 2',
    plans: [
      {id: 1, name: 'KKK', amount: '555', type: 'Night', duration: '55'},
      {id: 2, name: 'MMM', amount: '666', type: 'Afternoon', duration: '66'},
      {id: 3, name: 'NNN', amount: '333', type: 'Full Day', duration: '33'},
    ],
  },
];

const LibraryListing = () => {
  const [librarys, setLibrarys] = useState ([]);

  const [currentPlan, setCurrentPlan] = useState ({
    currentLibraryId: '',
    amount: '',
    duration: '',
    name: '',
    type: '',
  });

  const [libraryOptions, setLibraryOptions] = useState ([]);
  const [planOptions, setplanOptions] = useState ([]);

  useEffect (() => {
    setLibrarys (librarysData);
    let latestOptions = [];

    librarysData.map (plan => {
      latestOptions.push ({
        value: plan.id,
        label: plan.name,
      });
    });
    setLibraryOptions (latestOptions);
  }, []);

  const onPlanChange = e => {
    const currentLib = librarys.find (
      lib => lib.id === currentPlan.currentLibraryId
    );
    // console.log (currentLib);
    // return;

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

export default LibraryListing;
