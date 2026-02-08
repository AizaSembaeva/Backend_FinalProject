(function () {
  window.ui.renderHeader();
  window.ui.renderFooter();

  const form = document.getElementById("registerForm");
  const msg = document.getElementById("registerMsg");

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
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

    const nErr = window.validators.validateName(name.value.trim());
    const eErr = window.validators.validateEmail(email.value.trim());
    const pErr = window.validators.validatePassword(password.value);
    const phErr = window.validators.validatePhone(phone.value.trim());

    setFieldError(name, nErr);
    setFieldError(email, eErr);
    setFieldError(password, pErr);
    setFieldError(phone, phErr);

    if (nErr || eErr || pErr || phErr) return;

    try {
      const res = await window.api.register({
        name: name.value.trim(),
        email: email.value.trim(),
        password: password.value,
        phone: phone.value.trim(),
      });
      const data = res.data || res;
      window.auth.setAuth({ token: data.token, user: data.user });
      window.location.href = "profile.html";
    } catch (err) {
      window.ui.showMessage(msg, err.message, "error");
    }
  });
})();
