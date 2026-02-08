(function () {
  const KEY = "auth";

  function read() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "null");
    } catch {
      return null;
    }
  }

  function write(value) {
    localStorage.setItem(KEY, JSON.stringify(value));
  }

  function clear() {
    localStorage.removeItem(KEY);
  }

  window.storage = { read, write, clear };
})();
