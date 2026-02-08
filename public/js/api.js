(function () {
  function getApiBase() {
    const cfg = window.__APP_CONFIG__ || {};
    if (cfg.useRelativeApi) return "";
    return cfg.apiBase || "";
  }

  function getToken() {
    const auth = window.storage?.read();
    return auth?.token || null;
  }

  async function request(path, opts) {
    const base = getApiBase();
    const url = base + path;

    const headers = Object.assign(
      { "Content-Type": "application/json" },
      (opts && opts.headers) || {}
    );

    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(url, Object.assign({}, opts, { headers }));
    let data = null;

    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      data = await res.json().catch(() => null);
    } else {
      data = await res.text().catch(() => null);
    }

    if (!res.ok) {
      const msg =
        (data && (data.message || data.error)) ||
        (typeof data === "string" && data) ||
        `Request failed (${res.status})`;
      const err = new Error(msg);
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  window.api = {
    register: (body) => request("/api/auth/register", { method: "POST", body: JSON.stringify(body) }),
    login: (body) => request("/api/auth/login", { method: "POST", body: JSON.stringify(body) }),

    getServices: () => request("/api/service", { method: "GET" }),
    createService: (body) => request("/api/service", { method: "POST", body: JSON.stringify(body) }),
    updateService: (id, body) => request(`/api/service/${id}`, { method: "PUT", body: JSON.stringify(body) }),
    deleteService: (id) => request(`/api/service/${id}`, { method: "DELETE" }),

    createBooking: (body) => request("/api/bookings", { method: "POST", body: JSON.stringify(body) }),
    deleteBooking: (id) => request(`/api/bookings/${id}`, { method: "DELETE" }),

    getProfile: () => request("/api/users/profile", { method: "GET" }),
    updateProfile: (body) => request("/api/users/profile", { method: "PUT", body: JSON.stringify(body) }),
  };
})();
