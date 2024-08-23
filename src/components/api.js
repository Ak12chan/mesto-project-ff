export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
  headers: {
    authorization: '8e822112-26f4-4ef1-8bdd-88d619f8a7c6',
    'Content-Type': 'application/json',
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};


export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};


export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};


export const editUserInfo = (profileData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(profileData),
  }).then(handleResponse);
};


export const addNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(cardData),
  }).then(handleResponse);
};


export const deleteCard = (_id) => {
  return fetch(`${config.baseUrl}/cards/${_id}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify(),
  }).then(handleResponse);
};

export const addLike = (_id) => {
  return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify(),
  }).then(handleResponse);
};

export const removeLike = (_id) => {
  return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify(),
  }).then(handleResponse);
};


export const editAvatar = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(handleResponse);
};
