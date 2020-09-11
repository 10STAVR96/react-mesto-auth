import React from 'react';
import success from '../images/success.svg';
import error from '../images/error.svg';

function InfoTooltip(props) {
  return (
    <div id="infoTooltip" className={(props.isOpen ? "popup popup_opened" : "popup")}>
      <div className="popup__container popup__container_size_tooltip">
        <button onClick={props.onClose} className="popup__close" type="button"></button>
        <img className="popup__tooltip-image" src={(props.successStyle ? success : error)} />
  <span className="popup__tooltip-message">{props.successStyle ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</span>
      </div>
    </div>
  );
}

export default InfoTooltip;