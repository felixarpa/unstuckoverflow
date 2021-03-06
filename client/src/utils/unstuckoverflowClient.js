import axios from 'axios';
import sjcl from 'sjcl';

const BASE = 'http://35.187.102.14:8081';

const encrypt = (password) => {
  const out = sjcl.hash.sha256.hash(password);
  return sjcl.codec.hex.fromBits(out);
};

export const postUser = (name, email, phoneNumber, password) =>
  new Promise((resolve, reject) => {
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

export const getTag = (query) =>
  new Promise((resolve, reject) => {
    axios.get(`${BASE}/tag?prefix_tag=${query}`)
      .then((response) => {
        const data = response.data;
        if (data.error) {
          reject();
        } else {
          resolve(data.response);
        }
      })
      .catch(reject);
  });

export const getSkills = (userId) =>
  new Promise((resolve, reject) => {
    axios.get(`${BASE}/user/skills?user_id=${userId}`)
      .then((response) => {
        const data = response.data;
        if (data.error) {
          reject();
        } else {
          resolve(data.response);
        }
      })
      .catch(reject);
  });

export const deleteSkill = (userId, tagId) =>
  new Promise((resolve, reject) => {
    axios.delete(`${BASE}/user/skills`, {
      data: {
        user_id: userId,
        tag_id: tagId,
      }
    }).then((response) => {
        const data = response.data;
        if (data.error) {
          reject();
        } else {
          resolve(data.response);
        }
      })
      .catch(reject);
  });

export const postSkill = (userId, tag) =>
  new Promise((resolve, reject) => {
    axios.post(`${BASE}/user/skills`, {
      user_id: userId,
      tag_name: tag,
    }).then((response) => {
      const data = response.data;
      if (data.error) {
        reject();
      } else {
        resolve(data.response);
      }
    })
      .catch(reject);
  });

export const login = (email, password) =>
  new Promise((resolve, reject) => {
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
