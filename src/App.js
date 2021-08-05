import {Provider} from 'react-redux';
import './App.css';
import Todos from './components/Todos';
import 'bootstrap/dist/css/bootstrap.css';
import TestForm from './components/TestForm';
import store from './store';
import LibraryListing from './components/LibraryListing';
import React, {useState} from 'react';

function App () {
  const [showForm, setShowForm] = useState (true);
  return (
    <Provider store={store}>
      {/* <Todos /> */}
      <div className="btn btn-primary" onClick={() => setShowForm (!showForm)}>
        {!showForm ? 'Add Plan' : 'Choose Plan'} {' '}
      </div>
      {showForm ? <TestForm /> : <LibraryListing />}

    </Provider>
  );
}

export default App;
