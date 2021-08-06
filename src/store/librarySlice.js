import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  librarys: [
    {
      id: 1,
      name: 'Testing 1',
      plans: [
        {id: 1, name: 'Basic', amount: '111', type: 'Morning', duration: '11'},
        {
          id: 2,
          name: 'Semi Premium',
          amount: '222',
          type: 'Evening',
          duration: '22',
        },
        {id: 3, name: 'Premium', amount: '333', type: 'Night', duration: '33'},
      ],
    },
    {
      id: 2,
      name: 'Testing 2',
      plans: [
        {id: 1, name: 'Silver', amount: '555', type: 'Night', duration: '55'},
        // {id: 2, name: 'Gold', amount: '666', type: 'Afternoon', duration: '66'},
        {
          id: 3,
          name: 'Platinum',
          amount: '333',
          type: 'Full Day',
          duration: '33',
        },
      ],
    },
  ],
};

const librarySlice = createSlice ({
  name: 'library',
  initialState,
  reducers: {
    addLibrary (state, action) {
      state.librarys.push (action.payload);
    },
    addNewPlan (state, action) {
      const {libId, newData} = action.payload;

      let newList = [...state.librarys];
      let currentLibrary = newList.find (lib => lib.id === libId);
      let currentLibraryIndex = newList.findIndex (lib => lib.id === libId);

      currentLibrary.plans.push (newData);
      newList[currentLibraryIndex] = currentLibrary;
      state.librarys = newList;
    },
    editPlan (state, action) {
      const {libId, newData, planId} = action.payload;

      let newList = [...state.librarys];

      let currentLibrary = newList.find (lib => lib.id === libId);
      let currentLibraryIndex = newList.findIndex (lib => lib.id === libId);

      const currentPlanIndex = currentLibrary.plans.findIndex (
        plan => plan.id === planId
      );

      currentLibrary.plans[currentPlanIndex] = newData;
      newList[currentLibraryIndex] = currentLibrary;

      state.librarys = newList; // without this also working
    },
    removePlan (state, action) {
      const {libId, planId} = action.payload;

      const newList = [...state.librarys];
      let updatedLib = newList.find (lib => lib.id === libId);
      let currentLibIndex = newList.findIndex (lib => lib.id === libId);

      const newPlans = updatedLib.plans.filter (plan => plan.id !== planId);

      updatedLib.plans = newPlans;
      newList[currentLibIndex] = updatedLib;

      state.librarys = newList;
    },
  },
});

export const libraryActions = librarySlice.actions;

export default librarySlice;
