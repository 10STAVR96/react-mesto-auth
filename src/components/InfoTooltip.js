import React from 'react';
import success from '../images/success.svg';
import error from '../images/error.svg';

function InfoTooltip(props) {
  const { isOpen, onClose, successStyle } = props;

  return (
    <div id="infoTooltip" className={(isOpen ? "popup popup_opened" : "popup")}>
      <div className="popup__container popup__container_size_tooltip">
        <button onClick={onClose} className="popup__close" type="button"></button>
        <img className="popup__tooltip-image" src={(successStyle ? success : error)} alt="картинка" />
  <span className="popup__tooltip-message">{successStyle ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</span>
      </div>
    </div>
  );
}

export default InfoTooltip;