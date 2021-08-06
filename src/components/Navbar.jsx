import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Redux</h1>
      </div>

      <div className="nav-links">
        <NavLink
          to="/todo-list"
          activeClassName="active"
          className="navbar-link"
        >
          To-do
        </NavLink>
        <NavLink to="/form" activeClassName="active" className="navbar-link">
          Add Library
        </NavLink>
        <NavLink
          to="/choose-plan"
          activeClassName="active"
          className="navbar-link"
        >
          Choose Plan
        </NavLink>
        <NavLink
          to="/lib-listing"
          activeClassName="active"
          className="navbar-link"
        >
          Library List
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
