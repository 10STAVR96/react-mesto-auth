import React from 'react';
import { NavLink, useHistory, withRouter } from 'react-router-dom';
import * as auth from '../utils/auth';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  function handleChangeEmail (e) {
    setEmail(e.target.value);
  }

  function handleChangePassword (e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth.register(email, password)
    .then((res) => {
      if (res) {
        props.successInfoToolTip();
        setTimeout(props.openInfoToolTip, 1000); //открываем InfoToolTip с задержкой чтобы стили успели смениться
        history.push('/sign-in');
      } else {
        props.openInfoToolTip();
      }
    });
  }

  return (
    <div className="authorization">
      <form onSubmit={handleSubmit} className="authorization__form">
        <h2 className="authorization__form-header">Регистрация</h2>
        <input 
          onChange={handleChangeEmail}
          type="email" 
          className="authorization__input"
          id="email"
          name="email"
          required 
          placeholder="Email"
        />
        <input 
          onChange={handleChangePassword}
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