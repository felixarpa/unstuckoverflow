export const Cookies = {
  get: () => {
    try {
      return JSON.parse(document.cookie);
    } catch {
      return {};
    }
  },
  set: (cookies) => document.cookie = JSON.stringify(cookies),
};
