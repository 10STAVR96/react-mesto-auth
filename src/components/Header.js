import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header() {
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
      </nav>
    </header>
  );
}

export default Header;