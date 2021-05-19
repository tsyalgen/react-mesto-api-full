import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddCard, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {

    const currentUser = React.useContext(CurrentUserContext);


    return(
        <main className="content">

            <section className="profile">
                <button onClick={onEditAvatar} className="profile__button-avatar">
                    <img src={currentUser.avatar} alt="аватар пользователя" className="profile__avatar" />
                </button>
                <div className="profile__info">
                    <div className="profile__string">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button onClick={onEditProfile} type="button" aria-label="редактирование профиля" className="profile__edit-button transparence"></button>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button onClick={onAddCard} type="button" aria-label="добавление изображения" className="profile__add-button transparence"></button>
            </section>
            

            <section className="elements">
                {cards.map((card) => {
                    return(
                        <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
                    )
                })}
            </section>
        </main>
    );
}

export default Main;