import React from 'react';
import { NavLink } from 'react-router-dom';
import * as auth from '../utils/auth';

function Register() {
  const [info, setInfo] = React.useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo({
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="authorization">
      <form className="authorization__form">
        <h2 className="authorization__form-header">Вход</h2>
        <input
          onChange={handleChange} 
          type="email" 
          className="authorization__input"
          id="email"
          name="email"
          required 
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          type="password" 
          className="authorization__input" 
          id="password"
          name="password"
          required
          placeholder="Пароль"
          pattern="[A-Za-zА-Яа-яЁё0-9 -]{2,40}" 
        />
        <button type="submit" className="authorization__submit">Войти</button>
        <div className="authorization__form-nav">
          <span>Ещё не зарегистрированы?&nbsp;</span>
          <NavLink className="authorization__form-link" to="/sign-up">Регистрация</NavLink>
        </div>
      </form>
    </div>
  );
}

export default Register;