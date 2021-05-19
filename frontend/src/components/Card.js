import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);



    const isOwn = (card.owner._id === currentUser._id || card.owner === currentUser._id);
    const cardDeleteButtonClassName = (
        `${isOwn ? 'element__trashbin' : ''} transparence`
    );

    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_active' : ''} transparence`
    );

    function handleClick() {
        onCardClick(card);
    }  

    function handleLikeClick () {
        onCardLike(card);
    }

    function handleDeleteClick () {
        onCardDelete(card);
    }


    return (
        <div className="element">
                <img  onClick={handleClick} src={card.link} alt={card.name} className="element__image" />
                <div className="element__string">
                    <h2 className="element__name">{card.name}</h2>
                    <div className="element_likes">
                        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                        <p className="element__like-counter">{card.likes.length}</p>
                    </div>
                </div>
                <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} ></button>
        </div>
    );
}

export default Card;