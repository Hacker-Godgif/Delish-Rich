export const auth = {
  token() {
    return localStorage.getItem("adminToken");
  },

  login(token) {
    localStorage.setItem("adminToken", token);
  },

  logout() {
    localStorage.removeItem("adminToken");
  },

  isLoggedIn() {
    return !!localStorage.getItem("adminToken");
  },
};