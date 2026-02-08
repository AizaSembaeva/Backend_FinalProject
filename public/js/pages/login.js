(function () {
  window.ui.renderHeader();
  window.ui.renderFooter();

  const form = document.getElementById("loginForm");
  const msg = document.getElementById("loginMsg");

  const email = document.getElementById("email");
  const password = document.getElementById("password");

  function setFieldError(input, text) {
    const small = input.parentElement.querySelector(".error-message");
    if (small) small.textContent = text || "";
    input.classList.remove("is-invalid", "is-valid");
    if (text) input.classList.add("is-invalid");
    else input.classList.add("is-valid");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    window.ui.showMessage(msg, "", "ok");

    const eErr = window.validators.validateEmail(email.value.trim());
    const pErr = password.value ? null : "Password is required";
    setFieldError(email, eErr);
    setFieldError(password, pErr);

    if (eErr || pErr) return;

    try {
      const res = await window.api.login({ email: email.value.trim(), password: password.value });
      const data = res.data || res;
      window.auth.setAuth({ token: data.token, user: data.user });
      window.location.href = "profile.html";
    } catch (err) {
      window.ui.showMessage(msg, err.message, "error");
    }
  });
})();
