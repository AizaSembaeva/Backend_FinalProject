(function () {
  function el(id) { return document.getElementById(id); }

  function setText(node, text) {
    if (!node) return;
    node.textContent = text;
  }

  function showMessage(container, msg, type) {
    if (!container) return;
    container.innerHTML = "";
    if (!msg) return;
    const div = document.createElement("div");
    div.className = type === "error" ? "form-message" : "form-message";
    if (type === "error") {
      div.style.background = "#fff5f5";
      div.style.borderColor = "#ffd1d1";
      div.style.color = "#a80000";
    }
    div.textContent = msg;
    container.appendChild(div);
  }

  function renderHeader() {
    const host = el("app-header");
    if (!host) return;

    const a = window.auth?.getAuth();
    const loggedIn = window.auth?.isLoggedIn();
    const admin = window.auth?.isAdmin();
    const current = (document.body.getAttribute("data-page") || "").trim();

    host.innerHTML = `
      <header class="site-header">
        <div class="header-inner container">
          <a class="logo" href="index.html">BeautySalon</a>
          <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">☰</button>
          <nav class="nav" id="navMenu">
            <ul class="nav-list">
              <li><a class="${current === "home" ? "active" : ""}" href="index.html">Home</a></li>
              <li><a class="${current === "services" ? "active" : ""}" href="services.html">Services</a></li>
              <li><a class="${current === "profile" ? "active" : ""}" href="profile.html">Profile</a></li>
              ${admin ? `<li><a class="${current === "admin" ? "active" : ""}" href="admin.html">Admin</a></li>` : ""}
              ${!loggedIn ? `<li><a class="${current === "login" ? "active" : ""}" href="login.html">Login</a></li>` : ""}
              ${!loggedIn ? `<li><a class="${current === "register" ? "active" : ""}" href="register.html">Register</a></li>` : ""}
              ${loggedIn ? `<li><a href="#" id="logoutLink">Logout</a></li>` : ""}
            </ul>
          </nav>
        </div>
      </header>
    `;

    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");
    if (toggle && menu) {
      toggle.addEventListener("click", () => menu.classList.toggle("show"));
    }

    const logoutLink = document.getElementById("logoutLink");
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        window.auth.logout();
        window.location.href = "index.html";
      });
    }
  }

  function renderFooter() {
    const host = el("app-footer");
    if (!host) return;
    const year = new Date().getFullYear();
    host.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-inner">
          <div>© ${year} BeautySalon</div>
          <div>
            <a href="services.html">Services</a>
            <a href="profile.html">Profile</a>
          </div>
        </div>
        <div class="container copyright">WEB Backend Final Project.</div>
      </footer>
    `;
  }

  function requireLogin() {
    if (!window.auth.isLoggedIn()) {
      window.location.href = "login.html";
      return false;
    }
    return true;
  }

  function requireAdmin() {
    if (!window.auth.isLoggedIn()) {
      window.location.href = "login.html";
      return false;
    }
    if (!window.auth.isAdmin()) {
      window.location.href = "index.html";
      return false;
    }
    return true;
  }

  window.ui = { renderHeader, renderFooter, showMessage, requireLogin, requireAdmin };
})();
