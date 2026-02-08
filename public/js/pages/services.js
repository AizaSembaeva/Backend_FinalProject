(function () {
  window.ui.renderHeader();
  window.ui.renderFooter();

  const grid = document.getElementById("servicesGrid");
  const msg = document.getElementById("servicesMsg");

  const bookingForm = document.getElementById("bookingForm");
  const bookingMsg = document.getElementById("bookingMsg");
  const serviceSelect = document.getElementById("serviceId");
  const dateTimeInput = document.getElementById("dateTime");
  const noteInput = document.getElementById("note");

  async function loadServices() {
    try {
      const data = await window.api.getServices();
      const services = (data && data.data && data.data.services) || (data && data.services) || [];

      grid.innerHTML = services.map(s => `
        <div class="service-card">
          <h3 style="color: var(--brand-deep)">${escapeHtml(s.title)}</h3>
          <p>${escapeHtml(s.description || "")}</p>
          <p><strong>$${Number(s.price).toFixed(2)}</strong> • ${Number(s.durationMin)} min</p>
        </div>
      `).join("");

      serviceSelect.innerHTML = `<option value="">Choose a service</option>` + services.map(s =>
        `<option value="${s._id}">${escapeHtml(s.title)} — $${Number(s.price).toFixed(2)}</option>`
      ).join("");
    } catch (e) {
      window.ui.showMessage(msg, e.message, "error");
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
  }

  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    window.ui.showMessage(bookingMsg, "", "ok");

    if (!window.ui.requireLogin()) return;

    const payload = {
      serviceId: serviceSelect.value,
      dateTime: dateTimeInput.value,
      note: noteInput.value.trim(),
    };

    const errs = window.validators.validateBooking(payload);
    const errText = Object.values(errs).filter(Boolean)[0] || null;
    if (errText) {
      window.ui.showMessage(bookingMsg, errText, "error");
      return;
    }

    try {
      const res = await window.api.createBooking(payload);
      const booking = (res && res.data && res.data.booking) || (res && res.booking);
      window.ui.showMessage(
        bookingMsg,
        `Booked! Booking id: ${booking?._id || "(unknown)"} — check Profile page.`,
        "ok"
      );
      bookingForm.reset();
    } catch (err) {
      window.ui.showMessage(bookingMsg, err.message, "error");
    }
  });

  loadServices();
})();
