export const BASE_URL = 'https://api.tsyalgen.students.nomoredomains.monster';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email, password
        })
    })
        .then(getResponseData)
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(getResponseData)
};

export const checkJWTToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(getResponseData);
};

const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка ${res.status}: ${res.statusText} `);
    }

    return res.json();
}