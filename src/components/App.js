import React from 'react';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import EditProfilePopup from './EditProfilePopup';
import ConfirmationPopup from './ConfirmationPopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import FormValidator from '../utils/FormValidator';
import { formElements } from '../utils/utils';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [successInfoToolTip, setSuccessInfoToolTip] = React.useState('aad');
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [currentCard, setCurrentCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardDelete, setCardDelete] = React.useState([]);

  function handleSuccessInfoToolTip() {
    setSuccessInfoToolTip(true);
  }
  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick() {
    setSelectedCard(true);
  }

  function openConfirmPopup() {
    setIsConfirmPopupOpen(true);
  }


  function setCurrentImage(card) { 
    setCurrentCard(card); 
    handleCardClick(); 
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setTimeout(setSuccessInfoToolTip, 2000, false);
    setCurrentCard({});
  }

  function handleUpdateUser(user) {
    api.setProfileUserInfo(user.name, user.about)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(user) {
    api.setProfileAvatar(user.avatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeStatus(card._id, !isLiked)
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    });
  }

  function handleCardDelete(card) {
    setCardDelete(card);
    openConfirmPopup();
  }

  function handleConfirmDeleteCardSubmit() {
    api.deleteCard(cardDelete._id)
    .then(() => {
      const newCards = cards.filter((i) => i._id !== cardDelete._id);
      setCards(newCards);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
    .then((res) => {
      setCards([...cards, res]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  React.useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getCards()])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch((err) => {
      console.log(err);
    });

    const formProfileValidation = new FormValidator(formElements, document.querySelector('#form-profile')); /*валидация формы профиля*/
    const formAvatarValidation = new FormValidator(formElements, document.querySelector('#form-avatar')); /*валидация формы изменения аватара*/
    const formCardValidation = new FormValidator(formElements, document.querySelector('#form-card')); /*валидация формы добавления карточки*/
    formProfileValidation.enableValidation();
    formAvatarValidation.enableValidation();
    formCardValidation.enableValidation();
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <BrowserRouter>
        <Header />
        <Switch>
          <ProtectedRoute 
            path="/cards" 
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick} 
            onImageClick={setCurrentImage} 
            cards={cards} 
            onCardLike={handleCardLike} 
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-up">
            <Register openInfoToolTip={handleInfoTooltipOpen} successInfoToolTip={handleSuccessInfoToolTip} />
          </Route>
          <Route path="/sign-in">
            <Login openInfoToolTip={handleInfoTooltipOpen} successInfoToolTip={handleSuccessInfoToolTip} />
          </Route>
          <Route path="/">
            { loggedIn ? <Redirect to="/cards" /> : <Redirect to="/sign-in" /> }
          </Route>
        </Switch>

        <Footer />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} successStyle={successInfoToolTip} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}  onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen}  onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ConfirmationPopup isOpen={isConfirmPopupOpen} onSubmit={handleConfirmDeleteCardSubmit} onClose={closeAllPopups} />
        <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} card={currentCard} />

      </BrowserRouter>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
