import React from 'react';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import store from './store';
import Navbar from './components/Navbar';
import routes from './routes';

import {Switch, Route, Redirect} from 'react-router-dom';

function App () {
  return (
    <Provider store={store}>
      <Navbar />
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/todo-list" />} />
        {routes.map ((route, key) => {
          return (
            <Route key={key} path={route.path} component={route.component} />
          );
        })}
      </Switch>
    </Provider>
  );
}

export default App;
