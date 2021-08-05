import React, {useState, useRef, useEffect} from 'react';
import Select from 'react-select';
import {useDropzone} from 'react-dropzone';

const TestForm = () => {
  const [selectOptions, setSelectOptions] = useState ([]);
  const [loading, setLoading] = useState (false);
  const [selectedOptions, setSelectedOptions] = useState ('Morning');
  const libNameRef = useRef ();

  const [dynamicPlan, setDynamicPlan] = useState ([
    {
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

  // useEffect (() => {
  //   setLoading (true);
  //   setTimeout (() => {
  //     setLoading (false);
  //   }, 2000);
  // }, []);

  const submitHandler = e => {
    e.preventDefault ();
    if (libNameRef.current.value === '') {
      alert ('please enter library name');
      return;
    }
    const fullData = {
      name: libNameRef.current.value,
      plans: dynamicPlan,
    };
    console.log (fullData);
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
    console.log (newList);
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
                // value={planTypeOptions[1]}
                // && getPlanType (plan.type)
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

{
  /* <Select
          onChange={onChangeSelect}
          isLoading={loading}
          options={selectOptions}
          autoFocus="true"
        /> */
}
{
  /* const onChangeSelect = e => console.log (e);
  // const onChangePlan = (value, action) => console.log (action.name); 
  we can manage loading in select */
}

export default TestForm;
