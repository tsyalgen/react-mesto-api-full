import React, {useState} from "react";
import {Link} from "react-router-dom";

function Register({ onRegister }) {

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onRegister(userData.email, userData.password);
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit} name="register" method="POST" action="#" className="login__form" noValidate>
                <h2 className="login__title">Регистрация</h2>
                <label className="login__input-container">
                    <input onChange={handleChange} type="email" value={userData.email || ''} name="email" id="email" placeholder="Email"
                           className="login__field login__field_type_email" minLength="2" maxLength="40" required/>
                </label>
                <label className="login__input-container">
                    <input onChange={handleChange} type="password" value={userData.password || ''} name="password" id="password" placeholder="Пароль"
                           className="login__field login__field_type_password" minLength="2" maxLength="200"
                           required/>
                </label>
                <button type="submit" className="login__button transparence">Зарегистрироваться</button>
                <Link to="/singin" className="login__link transparence">Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    )
}

export default Register;