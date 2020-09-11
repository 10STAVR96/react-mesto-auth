import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import * as auth from '../utils/auth';

function Register(props) {
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
    let { email, password } = info;
    auth.register(email, password).then((res) => {
      if (res) {
        props.successInfoToolTip();
        props.openInfoToolTip();
        props.history.push('/sign-in');
      } else {
        props.openInfoToolTip();
        setInfo({
          message: '400 - некорректно заполнено одно из полей'
        })
      }
    })
  }

  return (
    <div className="authorization">
      <form onSubmit={handleSubmit} className="authorization__form">
        <h2 className="authorization__form-header">Регистрация</h2>
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
        <button type="submit" className="authorization__submit">Зарегистрироваться</button>
        <div className="authorization__form-nav">
          <span>Уже зарегистрированы?&nbsp;</span>
          <NavLink className="authorization__form-link" to="/sign-in">Войти</NavLink>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Register);