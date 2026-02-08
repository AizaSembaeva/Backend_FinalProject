(function () {
  window.ui.renderHeader();
  window.ui.renderFooter();

  if (!window.ui.requireLogin()) return;

  const msg = document.getElementById("profileMsg");
  const userBox = document.getElementById("userBox");
  const bookingsBox = document.getElementById("bookingsBox");

  const form = document.getElementById("profileForm");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const saveMsg = document.getElementById("saveMsg");

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
  }

  async function load() {
    try {
      const res = await window.api.getProfile();
      const data = res.data || res;
      const user = data.user;
      const bookings = data.bookings || [];

      userBox.innerHTML = `
        <div class="table" style="padding: 1rem;">
          <h2 style="color: var(--brand-deep); margin-bottom: .5rem;">Your Profile</h2>
          <p><strong>Name:</strong> ${escapeHtml(user.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(user.phone || "")}</p>
          <p><strong>Role:</strong> ${user.isAdmin ? "Admin" : "User"}</p>
        </div>
      `;

      nameInput.value = user.name || "";
      phoneInput.value = user.phone || "";

      renderBookings(bookings);

      const current = window.auth.getAuth();
      if (current && current.user) {
        window.auth.setAuth({ token: current.token, user: { ...current.user, ...user } });
      }
    } catch (e) {
      window.ui.showMessage(msg, e.message, "error");
    }
  }

  function renderBookings(bookings) {
    if (!bookings.length) {
      bookingsBox.innerHTML = `<p>No bookings yet. Go to <a href="services.html">Services</a>.</p>`;
      return;
    }
    bookingsBox.innerHTML = `
      <div class="table">
        <table style="width:100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="text-align:left; padding:.75rem;">Service</th>
              <th style="text-align:left; padding:.75rem;">Date</th>
              <th style="text-align:left; padding:.75rem;">Note</th>
              <th style="padding:.75rem;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${bookings.map(b => `
              <tr>
                <td style="padding:.75rem;">${escapeHtml(b.serviceId?.title || "")}</td>
                <td style="padding:.75rem;">${new Date(b.dateTime).toLocaleString()}</td>
                <td style="padding:.75rem;">${escapeHtml(b.note || "")}</td>
                <td style="padding:.75rem; text-align:center;">
                  <button class="btn" data-del="${b._id}" style="padding:.45rem 1rem;">Delete</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;

    bookingsBox.querySelectorAll("button[data-del]").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-del");
        if (!id) return;
        if (!confirm("Delete this booking?")) return;
        try {
          await window.api.deleteBooking(id);
          await load();
        } catch (e) {
          alert(e.message);
        }
      });
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    window.ui.showMessage(saveMsg, "", "ok");

    const payload = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
    };

    const nErr = window.validators.validateName(payload.name);
    const pErr = window.validators.validatePhone(payload.phone);

    if (nErr || pErr) {
      window.ui.showMessage(saveMsg, nErr || pErr, "error");
      return;
    }

    try {
      const res = await window.api.updateProfile(payload);
      const data = res.data || res;
      window.ui.showMessage(saveMsg, "Profile updated!", "ok");

      const current = window.auth.getAuth();
      if (current) window.auth.setAuth({ token: current.token, user: { ...current.user, ...data.user } });

      await load();
    } catch (err) {
      window.ui.showMessage(saveMsg, err.message, "error");
    }
  });

  load();
})();
