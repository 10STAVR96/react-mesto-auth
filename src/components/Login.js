import React from 'react';
import { NavLink, useHistory, withRouter } from 'react-router-dom';
import * as auth from '../utils/auth';

function Login(props) {
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

    if (!email || !password) {
      return;
    }
    auth.authorize(email, password)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        setEmail('');
        setPassword('');
        props.handleLogin();
        props.checkToken();
        history.push('/cards');
      }
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="authorization">
      <form onSubmit={handleSubmit} className="authorization__form" id="login">
        <h2 className="authorization__form-header">Вход</h2>
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
        <button type="submit" className="authorization__submit">Войти</button>
        <div className="authorization__form-nav">
          <span>Ещё не зарегистрированы?&nbsp;</span>
          <NavLink className="authorization__form-link" to="/sign-up">Регистрация</NavLink>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Login);