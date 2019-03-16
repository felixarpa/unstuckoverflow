import axios from 'axios';

const BASE = 'http://localhost:8080/';

export const getUser = (userId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE}/${userId}`)
      .then((response) => {
        const data = response.data;
        if (data.error) {
          reject(data.message);
        } else {
          resolve(data.response);
        }
      })
      .catch(err => reject(err));
  });
};
export const postUser = () => {};

export const getProfile = (userId) => {};
export const postProfile = (userId) => {};
export const putProfile = () => {};
