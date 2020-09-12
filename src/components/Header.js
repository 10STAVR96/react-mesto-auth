import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import logo from '../images/logo.svg';
import menuOpen from '../images/mobile-menu.svg';
import menuClose from '../images/close-icon.svg';

function Header(props) {
  const headerElement = React.createRef();
  const [headerWidth, setHeaderWidth] = React.useState('');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  function handleMenu () {
    setIsMenuOpen(!isMenuOpen);
  }

  const buttonMenuOpen = (
    <button className="header__open-menu" type="button" onClick={handleMenu}>
      <img className="header__menu-icon" src={isMenuOpen ? menuClose : menuOpen} alt="инонка меню" />
    </button>
  );
  const nav = (
    <nav className={props.loggedIn ? "header__menu header__menu_mobile" : "header__menu"}>
      <Route path="/sign-up">
        <NavLink className="header__link" to="/sign-in">Войти</NavLink>
      </Route>
      <Route path="/sign-in">
        <NavLink className="header__link" to="/sign-up">Регистрация</NavLink>
      </Route>
      <Route path="/cards">
        <p className="header__email">{props.loggedInEmail}</p>
        <button onClick={props.signOut} type="button" className="header__logout">Выйти</button>
      </Route>
    </nav>
  );

  React.useEffect(() => {
    setHeaderWidth(headerElement.current.parentElement.clientWidth);
  }, [headerElement]);

  return (
    <>
    { (headerWidth < 375 && isMenuOpen && props.loggedIn) ? nav : null }
    <header ref={headerElement} className="header">
      <img className="header__logo" src={logo} alt="лого" />
      { (headerWidth >= 375) ? nav : null }
      { (headerWidth >= 375) ? null : props.loggedIn ? buttonMenuOpen : nav }
    </header>
    </>
  );
}

export default Header;