import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import MainPage from './MainPage';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loggedInEmail, setLoggedInEmail] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [successInfoToolTip, setSuccessInfoToolTip] = React.useState(false);  //стейт для смены стиля InfoToolTip
  const history = useHistory();

  function handleLogin() {
    setLoggedIn(true);
  }
  function handleSuccessInfoToolTip() {
    setSuccessInfoToolTip(true);
  }
  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }
  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    setTimeout(setSuccessInfoToolTip, 2000, false);
  }
  function signOut () {
    setLoggedInEmail('');
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in');
  }
  function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getToken(token)
      .then((res) => {
        if (res.data) {
          handleLogin();
          setLoggedInEmail(res.data.email);
          history.push('/cards');
        } else {
          localStorage.removeItem('token');
        }
      });
    }
  }

  React.useEffect(() => {
    checkToken();
  }, [history]);  // eslint ругается и хочет добавить саму функцию в массив зависимостей, что будет ошибкой, поэтому как то так, функция срабатывает 1 раз - при перезагрузке страницы >)

  return (
    <div className="page">
        <Header loggedInEmail={loggedInEmail} signOut={signOut} loggedIn={loggedIn} />
        <Switch>
          <ProtectedRoute path="/cards" loggedIn={loggedIn} component={MainPage} />
          <Route path="/sign-up">
            <Register 
              openInfoToolTip={handleInfoTooltipOpen} 
              successInfoToolTip={handleSuccessInfoToolTip} 
            />
          </Route>
          <Route path="/sign-in">
            <Login 
              openInfoToolTip={handleInfoTooltipOpen} 
              successInfoToolTip={handleSuccessInfoToolTip} 
              handleLogin={handleLogin}
              checkToken={checkToken}
            />
          </Route>
          <ProtectedRoute path="/" loggedIn={loggedIn} component={MainPage} />
        </Switch>
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} successStyle={successInfoToolTip} />
    </div>
  );
}

export default App;
