(function () {
  window.ui.renderHeader();
  window.ui.renderFooter();

  if (!window.ui.requireAdmin()) return;

  const msg = document.getElementById("adminMsg");
  const list = document.getElementById("adminServices");
  const form = document.getElementById("serviceForm");
  const formMsg = document.getElementById("serviceMsg");

  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const price = document.getElementById("price");
  const durationMin = document.getElementById("durationMin");
  const isActive = document.getElementById("isActive");
  const serviceId = document.getElementById("serviceId");

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
  }

  function resetForm() {
    serviceId.value = "";
    title.value = "";
    description.value = "";
    price.value = "";
    durationMin.value = "";
    isActive.checked = true;
  }

  async function load() {
    try {
      const res = await window.api.getServices();
      const services = (res.data && res.data.services) || res.services || [];
      render(services);
    } catch (e) {
      window.ui.showMessage(msg, e.message, "error");
    }
  }

  function render(services) {
    list.innerHTML = `
      <div class="table">
        <table style="width:100%; border-collapse:collapse;">
          <thead>
            <tr>
              <th style="text-align:left; padding:.75rem;">Title</th>
              <th style="text-align:left; padding:.75rem;">Price</th>
              <th style="text-align:left; padding:.75rem;">Duration</th>
              <th style="text-align:left; padding:.75rem;">Active</th>
              <th style="padding:.75rem;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${services.map(s => `
              <tr>
                <td style="padding:.75rem;">${escapeHtml(s.title)}</td>
                <td style="padding:.75rem;">$${Number(s.price).toFixed(2)}</td>
                <td style="padding:.75rem;">${Number(s.durationMin)} min</td>
                <td style="padding:.75rem;">${s.isActive ? "Yes" : "No"}</td>
                <td style="padding:.75rem; text-align:center;">
                  <button class="btn" data-edit="${s._id}" style="padding:.45rem 1rem; margin-right:.4rem;">Edit</button>
                  <button class="btn" data-del="${s._id}" style="padding:.45rem 1rem; background: var(--brand-pink);">Delete</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;

    list.querySelectorAll("button[data-edit]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-edit");
        const s = services.find(x => x._id === id);
        if (!s) return;
        serviceId.value = s._id;
        title.value = s.title || "";
        description.value = s.description || "";
        price.value = s.price;
        durationMin.value = s.durationMin;
        isActive.checked = !!s.isActive;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    list.querySelectorAll("button[data-del]").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-del");
        if (!confirm("Delete this service?")) return;
        try {
          await window.api.deleteService(id);
          await load();
        } catch (e) {
          alert(e.message);
        }
      });
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    window.ui.showMessage(formMsg, "", "ok");

    const payload = {
      title: title.value.trim(),
      description: description.value.trim(),
      price: Number(price.value),
      durationMin: Number(durationMin.value),
      isActive: !!isActive.checked,
    };

    const errs = window.validators.validateService(payload);
    const firstErr = Object.values(errs).filter(Boolean)[0] || null;
    if (firstErr) {
      window.ui.showMessage(formMsg, firstErr, "error");
      return;
    }

    try {
      if (serviceId.value) {
        await window.api.updateService(serviceId.value, payload);
        window.ui.showMessage(formMsg, "Service updated!", "ok");
      } else {
        await window.api.createService(payload);
        window.ui.showMessage(formMsg, "Service created!", "ok");
      }
      resetForm();
      await load();
    } catch (err) {
      window.ui.showMessage(formMsg, err.message, "error");
    }
  });

  document.getElementById("resetBtn").addEventListener("click", (e) => {
    e.preventDefault();
    resetForm();
    window.ui.showMessage(formMsg, "", "ok");
  });

  load();
})();
