import React from 'react';

function ImagePopup({card, onClose}) {
    if (!card) {
        return null
    }

    return (
        <div className={`popup popup_type_photo ${card ? 'popup_opened' : ''}`}>
            <div onClick={onClose} className="popup__overlay"></div>
            <div className="popup__container">
                <img src={card.link} alt="открывающаяся картинка" className="popup__image"/>
                <p className="popup__name">{card.name}</p>
                <button onClick={onClose} type="button" aria-label="закрытие попапа"
                        className="popup__close-button transparence"></button>
            </div>
        </div>
    );
}

export default ImagePopup;