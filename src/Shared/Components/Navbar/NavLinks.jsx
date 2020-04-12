import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../Context/auth_context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
  <ul className="nav-links">
    <li>
      <NavLink to="/" exact>INICIO</NavLink>
    </li>
    {auth.isLoggedIn && (
        <li>
          <NavLink to="/donation">TUS DONACIONES</NavLink>
        </li>
      )}
    <li>
      <NavLink to="/help">DONAR</NavLink>
    </li>
    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/login">INICIAR SESION</NavLink>
      </li>
    )}
    {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
  </ul>
  );
};

export default NavLinks;