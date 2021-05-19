import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup ( { isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
 

    function handleNameChange (e) {
        setName(e.target.value)
    }

    function handleDescriptionChange (e) {
        setDescription(e.target.value)
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser.name, currentUser.about]);

    function handleSubmit (e) {
        e.preventDefault();


        onUpdateUser({ name, about: description
        });
    }

    return (
        <PopupWithForm title="Редактировать профиль" name="profile" saveButtonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <label className="popup__input-container">
                <input type="text" value={name ? name : ''} name="name" id="input-name" onChange={handleNameChange} className="popup__field popup__field_type_name" minLength="2" maxLength="40" required />
                <span id="input-name-error" className="popup__field-error popup__field-error_type_name "></span>
            </label>
            <label className="popup__input-container">
                <input type="text" value={description ? description : ''} name="description" id="input-description" onChange={handleDescriptionChange} className="popup__field popup__field_type_description" minLength="2" maxLength="200" required />
                <span id="input-description-error" className="popup__field-error popup__field-error_type_description"></span>
            </label>       
        </PopupWithForm>
    );
}

export default EditProfilePopup;