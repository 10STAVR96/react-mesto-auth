import { cohortId } from './utils';
export const BASE_URL = `https://mesto.nomoreparties.co/v1/${cohortId}/`;

export const register = () => {
  return fetch(`${BASE_URL}/sign-up`, {
    method: 'POST',
    headers: {

    },
    body: JSON.stringify()
  })
  .then((res) => res.json())
  .then((res) => res)
  .catch((err) => console.log(err));
};
