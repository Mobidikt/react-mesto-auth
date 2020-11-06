import React from 'react';

function InfoTooltip({isOpen, onClose, loged}) {
  const open = isOpen && "popup_opened";
  const handleClickClose = () => {
    onClose();
  }
  return (
    <div
      className={`popup popup_type_info ${open}`}
    >
      <div className={`popup__container popup__container_info`}>
        <img className='popup__image' src={loged ? '../images/popup/success.svg' : '../images/popup/failure.svg'} alt='Ответ от сервера'/>
        <h3 className="popup__title">{loged? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
        <button
          type="button"
          className="popup__close"
          onClick={handleClickClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;