import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Dashboard</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/nuevo_producto" className="nav-link">Nuevo</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
