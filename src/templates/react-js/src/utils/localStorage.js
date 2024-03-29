export const globalLocalStorage = {
  setAccessToken: (accessToken) => {
    localStorage.setItem("x-access", accessToken);
  },
  removeAccessToken: () => {
    localStorage.removeItem("x-access");
  },
  getAccessToken: () => localStorage.getItem("x-access"),
};
