import React, {useState} from 'react';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth';


function App() {

    const [currentUser, setCurrentUser] = useState({});

    const [cards, setCards] = useState([]);


    const [loggedIn, setLoggedIn] = useState(false);

    const [userEmail, setUserEmail] = useState('');

    const [infoTooltip, setInfoTooltip] = useState('');

    const history = useHistory();

    React.useEffect(() => {
        checkToken();
    }, []);


    React.useEffect(() => {

        Promise.all([api.getUserinfo(), api.initialCards()])
            .then((res) => {
                const [info, cards] = res;

                setCurrentUser(info);

                const serverCards = cards.data.map((card) => ({
                    link: card.link,
                    alt: card.name,
                    likes: card.likes,
                    name: card.name,
                    _id: card._id,
                    owner: card.owner
                }));

                setCards(serverCards);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [loggedIn]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeStatus(card._id, isLiked)
            .then((newCard) => {

                const newCards = cards.map((c) => c._id === card._id ? newCard.data : c);

                setCards(newCards);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((c) => c._id !== card._id);


                setCards(newCards);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);

    function handleAddCardClick() {
        setIsAddCardPopupOpen(true);
    }

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);

    function handleInfoTooltipOpen(value) {
        setIsInfoTooltipOpen(true);
        setIsSuccess(value);
    }

    const handleInfoTooltip = (text) => {
        setInfoTooltip(text);
    }

    const [selectedCard, setSelectedCard] = useState(null);


    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddCardPopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
        setIsInfoTooltipOpen(false);
    }

    function handleUpdateUser(items) {
        api.setUserinfo(items.name, items.about)
            .then((res) => {
                setCurrentUser(res.data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(url) {
        api.changeAvatar(url.avatar)
            .then((res) => {
                setCurrentUser(res.data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(card) {
        api.addNewCard(card.name, card.link)
            .then((res) => {
                const newCards = ([res.data, ...cards]);
                setCards(newCards);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleRegister = (email, password) => {
        auth.register(email, password)
            .then(() => {
                handleInfoTooltip('Вы успешно зарегистрировались!')
                handleInfoTooltipOpen(true)
                history.push('./signin')

            })
            .catch((error) => {
                handleInfoTooltip('Что-то пошло не так! Попробуйте еще раз.')
                handleInfoTooltipOpen(false);
                console.log(error)
            })
    }

    const handleLogin = (email, password) => {
        auth.authorize(email, password)
            .then(data => {
                localStorage.setItem('jwt', data.token);
                setUserEmail(email)
                setLoggedIn(true)
                history.push('/')

            })
            .catch((error) => {
                console.log(error)
            });
    }

    const checkToken = () => {
        const token = localStorage.getItem('jwt');
        if (token) {
            auth.checkJWTToken(token)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true)
                        setUserEmail(res.email)
                        history.push('/')
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    const handleSignOut = () => {
        localStorage.removeItem('jwt')
        setUserEmail('')
        setLoggedIn(false)
        history.push('/signin')
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="wrapper">
                <div className="page">

                    <Header loggedIn={loggedIn} email={userEmail} onSignOut={handleSignOut}/>
                    <Switch>
                        <Route path="/signup">
                            <Register onRegister={handleRegister}/>
                        </Route>
                        <Route path="/signin">
                            <Login onLogin={handleLogin}/>
                        </Route>
                        <ProtectedRoute exact path="/"
                                        loggedIn={loggedIn} component={Main} onEditProfile={handleEditProfileClick}
                                        onAddCard={handleAddCardClick}
                                        onEditAvatar={handleEditAvatarClick} onCardClick={setSelectedCard}
                                        onCardLike={handleCardLike} onCardDelete={handleCardDelete}
                                        cards={cards}/>
                        <Route>
                            {loggedIn ? <Redirect to="/"/> : <Redirect to="/signin"/>}
                        </Route>
                    </Switch>
                    <Footer/>

                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                      onUpdateUser={handleUpdateUser}/>

                    <AddPlacePopup isOpen={isAddCardPopupOpen} onClose={closeAllPopups}
                                   onAddPlace={handleAddPlaceSubmit}/>

                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                     onUpdateAvatar={handleUpdateAvatar}/>

                    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

                    <InfoTooltip isOpen={isInfoTooltipOpen} isSuccess={isSuccess} onClose={closeAllPopups} infoText={infoTooltip} />

                </div>
            </div>
        </CurrentUserContext.Provider>
    );

}

export default App;
