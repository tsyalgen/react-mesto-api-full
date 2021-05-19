class Api {
    constructor(adress) {
        this._adress = adress;
    }

    getUserinfo() {
        return fetch(`${this._adress}/users/me`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        });
    }

    setUserinfo(userName, userDescription) {
        return fetch(`${this._adress}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: `${userName}`,
                about: `${userDescription}`,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        });
    }

    initialCards() {
        return fetch(`${this._adress}/cards`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        });
    }

    addNewCard(cardName, cardLink) {
        return fetch(`${this._adress}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: `${cardName}`,
                link: `${cardLink}`,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        });
    }

    deleteCard(cardId) {
        return fetch(`${this._adress}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            if (res.ok) {
                return res.text();
            }

            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
    }

    changeLikeStatus(cardId, isLiked) {
        let methodType = ''
        if (isLiked) {
            methodType = 'DELETE';
        } else {
            methodType = 'PUT'
        }

        return fetch(`${this._adress}/cards/${cardId}/likes`, {
            method: methodType,
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
    }


    changeAvatar(url) {
        return fetch(`${this._adress}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: `${url}`,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
            .then((res) => {
                return res;
            });
    }

    loadAllData() {
        return Promise.all([this.getUserinfo(), this.initialCards()]);
    }
}

const api = new Api(
    'https://api.tsyalgen.students.nomoredomains.monster'
);

export default api;
