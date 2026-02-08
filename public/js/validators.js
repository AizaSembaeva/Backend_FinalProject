(function () {
  const reNotOnlyDigits = /^(?!\d+$).+/;

  function validateEmail(email) {
    if (!email) return "Email is required";
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return ok ? null : "Please enter a valid email";
  }

  function validatePassword(pw) {
    if (!pw) return "Password is required";
    if (pw.length < 8) return "Password must be at least 8 characters";
    if (pw.length > 72) return "Password is too long";
    return null;
  }

  function validateName(name) {
    if (!name) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (name.length > 80) return "Name is too long";
    if (!reNotOnlyDigits.test(name)) return "Name must not contain only digits";
    return null;
  }

  function validatePhone(phone) {
    if (!phone) return null;
    if (phone.length > 30) return "Phone number is too long";
    const ok = /^[0-9+\-\s()]{3,30}$/.test(phone);
    return ok ? null : "Please enter a valid phone number";
  }

  function validateService(service) {
    const errs = {};
    if (!service.title || service.title.trim().length < 2) errs.title = "Title must be at least 2 characters";
    if ((service.title || "").length > 120) errs.title = "Title is too long";
    if ((service.description || "").length > 2000) errs.description = "Description is too long";
    const price = Number(service.price);
    if (Number.isNaN(price) || price < 0) errs.price = "Price must be 0 or more";
    const duration = Number(service.durationMin);
    if (!Number.isInteger(duration) || duration < 5 || duration > 600) errs.durationMin = "Duration must be 5..600 minutes";
    return errs;
  }

  function validateBooking(b) {
    const errs = {};
    if (!b.serviceId || !/^[a-fA-F0-9]{24}$/.test(b.serviceId)) errs.serviceId = "Please choose a service";
    if (!b.dateTime) errs.dateTime = "Please choose date & time";
    return errs;
  }

  window.validators = {
    validateEmail,
    validatePassword,
    validateName,
    validatePhone,
    validateService,
    validateBooking,
  };
})();
