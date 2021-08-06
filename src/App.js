import {Provider} from 'react-redux';
import './App.css';
import Todos from './components/Todos';
import 'bootstrap/dist/css/bootstrap.css';
import TestForm from './components/TestForm';
import store from './store';
import ChoosePlan from './components/ChoosePlan';
import React, {useState} from 'react';
import LibraryListing from './components/LibraryListing';
import Navbar from './components/Navbar';
import {BrowserRouter} from 'react-router-dom';

function App () {
  const [showForm, setShowForm] = useState (false);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        {/* <Todos /> */}
        {/* <div className="btn btn-primary" onClick={() => setShowForm (!showForm)}>
        {!showForm ? 'Add Plan' : 'Choose Plan'} {' '}
      </div> */}
        {/* {showForm ? <TestForm /> : <ChoosePlan />} */}
        <LibraryListing />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
