export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`${res.status} - некорректно заполнено одно из полей`);
  })
  .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(res.status === 401 ? '401 - пользователь с email не найден' : '400 - не передано одно из полей');
  })
  .catch((err) => console.log(err));
};

export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`${res.status} - Переданный токен некорректен`);
  })
  .catch((err) => console.log(err));
};