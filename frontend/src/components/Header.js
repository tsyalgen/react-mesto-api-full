import React from 'react';
import {Link, Route} from "react-router-dom";
import logo from '../images/logo.svg';


function Header({loggedIn, email, onSignOut}) {
    return (
        <header className="header">
            <img src={logo} alt="логотип Место.Россия" className="header__logo"/>
            <div className="header__menu">
                <Route path="/">
                    {loggedIn && <><h2 className="header__menu header__menu_type_user-email">{email}</h2>
                        <button onClick={onSignOut} className="header__menu header__menu_type_button transparence">Выйти</button>
                    </>}
                    <Route path="/signin">
                        <Link to="/signup" className="header__menu header__menu_type_button transparence">Регистрация</Link>
                    </Route>
                    <Route path="/signup">
                        <Link to="/signin" className="header__menu header__menu_type_button transparence">Войти</Link>
                    </Route>
                </Route>
            </div>
        </header>
    );
}

export default Header;