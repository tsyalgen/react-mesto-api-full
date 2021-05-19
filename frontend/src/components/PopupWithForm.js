import React from 'react';

function PopupWithForm({name, title, isOpen, onClose, children, saveButtonText, onSubmit}) {

        return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div onClick={onClose} className="popup__overlay"></div>
            <form name={name} method="POST" action="#" onSubmit={onSubmit} className={`popup__form popup__form_type_${name}`} noValidate>
                <h2 className="popup__title">{title}</h2>
                {children}
                <button type="submit" className="popup__save-button">{saveButtonText}</button>
                <button onClick={onClose} type="button" aria-label="закрытие попапа" className="popup__close-button transparence"></button>
            </form>
        </div>
        );
}

export default PopupWithForm;