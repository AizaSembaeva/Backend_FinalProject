(function () {
  const DEFAULT_API = "http://localhost:5000";

  function normalizeBase(url) {
    return (url || "").replace(/\/+$/, "");
  }

  const sameOriginApi = normalizeBase(window.location.origin);

  const saved = localStorage.getItem("apiBase");
  const apiBase = normalizeBase(saved || DEFAULT_API);

  window.__APP_CONFIG__ = {
    DEFAULT_API,
    sameOriginApi,
    apiBase,
    useRelativeApi: (saved === "same-origin"),
  };
})();
