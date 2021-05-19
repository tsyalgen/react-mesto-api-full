import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup ({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleNameChange (e) {
        setName(e.target.value)
    }

    function handleLinkChange (e) {
        setLink(e.target.value)
    }

    function handleSubmit (e) {
        e.preventDefault();
        
        onAddPlace({
            name,
            link
        });
    }


    return(
        <PopupWithForm title="Новое место" name="add-card" saveButtonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <label className="popup__input-container">
                <input type="text" value={name? name : ''} name="name" placeholder="Название" id="input-title" onChange={handleNameChange} className="popup__field popup__field_type_card-name" minLength="1" maxLength="30" required />
                <span id="input-title-error" className="popup__field-error popup__field-error_type_card-name"></span>
            </label>
            <label className="popup__input-container">
                <input type="url" value={link? link : ''} name="link" placeholder="Ссылка на картинку" id="input-link" onChange={handleLinkChange} className="popup__field popup__field_type_link" required />
                <span id="input-link-error" className="popup__field-error popup__field-error_type_link"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;