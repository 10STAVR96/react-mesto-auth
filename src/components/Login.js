import React from 'react';
//import { Link, withRouter } from 'react-router-dom';
import logo from '../images/logo.svg';

function Register() {
  return (
    <div className="authorization">
      <div className="authorization__header">
        <img className="header__logo" src={logo} alt="лого" />
        <nav className="authorization__menu">
          <button className="authorization__header-link">Регистрация</button>
        </nav>
      </div>
      <form className="authorization__form">
        <h2 className="authorization__form-header">Вход</h2>
        <input 
          type="email" 
          className="authorization__input"
          id="email"
          name="email"
          required 
          placeholder="Email"
        />
        <input 
          type="password" 
          className="authorization__input" 
          id="password"
          name="password"
          required
          placeholder="Пароль"
          pattern="[A-Za-zА-Яа-яЁё0-9 -]{2,40}" 
        />
        <button type="submit" className="authorization__submit">Войти</button>
        <button className="authorization__form-link">Ещё не зарегистрированы? Регистрация</button>
      </form>
    </div>
  );
}

export default Register;