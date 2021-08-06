import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Admin Panel</h1>
      </div>

      <div className="nav-links">
        <NavLink exact to="/" activeClassName="active" className="navbar-link">
          Home{' '}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
