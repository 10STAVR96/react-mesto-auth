import React from 'react';
import { NavLink, Route, useHistory } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
  const history = useHistory();
  
  function signOut () {
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого" />
      <nav className="header__menu">
        <Route path="/sign-up">
          <NavLink className="header__link" to="/sign-in">Войти</NavLink>
        </Route>
        <Route path="/sign-in">
          <NavLink className="header__link" to="/sign-up">Регистрация</NavLink>
        </Route>
        <Route path="/cards">
          <p className="header__email">{props.loggedInEmail}</p>
          <button onClick={signOut} type="button" className="header__logout">Выйти</button>
        </Route>
      </nav>
    </header>
  );
}

export default Header;