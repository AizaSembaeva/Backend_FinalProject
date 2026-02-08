(function () {
  function setAuth(payload) {
    window.storage.write(payload);
  }

  function getAuth() {
    return window.storage.read();
  }

  function isLoggedIn() {
    return !!(getAuth() && getAuth().token);
  }

  function isAdmin() {
    return !!(getAuth() && getAuth().user && getAuth().user.isAdmin);
  }

  function logout() {
    window.storage.clear();
  }

  window.auth = { setAuth, getAuth, isLoggedIn, isAdmin, logout };
})();
