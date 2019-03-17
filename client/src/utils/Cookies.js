export const Cookies = {
  get: () => {
    try {
      return JSON.parse(document.cookie);
    } catch {
      return {};
    }
  },
set: (cookies) => {
  console.log('set');
  console.log(cookies);
  document.cookie = JSON.stringify(cookies)
  },
};
