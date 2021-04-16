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
    <li>
      <NavLink to="/about">NOSOTROS</NavLink>
    </li>
    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/login">INICIAR SESIóN</NavLink>
      </li>
    )}
    {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>CERRAR SESIÓN</button>
        </li>
      )}
  </ul>
  );
};

export default NavLinks;
