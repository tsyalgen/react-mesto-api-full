import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup ( { isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    } 


    return(
        <PopupWithForm title="Обновить аватар" name="avatar" saveButtonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <label className="popup__input-container">
                <input type="url" defaultValue="" ref={avatarRef} name="avatar" placeholder="Ссылка на картинку" id="input-avatar" className="popup__field popup__field_type_avatar" required />
                <span id="input-avatar-error" className="popup__field-error popup__field-error_type_link"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;