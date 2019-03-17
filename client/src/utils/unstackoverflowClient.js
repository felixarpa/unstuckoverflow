import axios from 'axios';
import sjcl from 'sjcl';

const BASE = 'http://localhost:8081';

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
      .catch(err => reject(err.response));
  });
};
export const postUser = (name, email, phoneNumber, password) => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE}/user`, {
      full_name: name,
      email: email,
      phone_number: phoneNumber,
      password: encrypt(password),
    }).then((response) => {
      const data = response.data;
      if (data.error) {
        reject();
      } else {
        resolve(data.response);
      }
    }).catch(reject);
  });
};

export const getProfile = (userId) => {};
export const postProfile = (userId) => {};
export const putProfile = () => {};

const encrypt = (password) => {
  const out = sjcl.hash.sha256.hash(password);
  const hash = sjcl.codec.hex.fromBits(out);
  console.log(hash);
  return hash;
};

export const login = (email, password) => {
  console.log(email);
  console.log(password);
  return new Promise((resolve, reject) => {
    axios.post(`${BASE}/user/login`, {
      email: email,
      password: encrypt(password)
    }).then((response) => {
      const data = response.data;
      if (data.error) {
        reject();
      } else {
        resolve(data.response);
      }
    }).catch(reject);
  });
};
