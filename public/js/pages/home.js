(function () {
  window.ui.renderHeader();
  window.ui.renderFooter();

  const list = document.getElementById("servicesPreview");
  const msg = document.getElementById("homeMsg");

  async function load() {
    try {
      const data = await window.api.getServices();
      const services = (data && data.data && data.data.services) || (data && data.services) || [];
      list.innerHTML = services.slice(0, 6).map(s => `
        <div class="feature-card">
          <h3>${escapeHtml(s.title)}</h3>
          <p>${escapeHtml(s.description || "")}</p>
          <p><strong>$${Number(s.price).toFixed(2)}</strong> • ${Number(s.durationMin)} min</p>
          <a class="btn" href="services.html">Book</a>
        </div>
      `).join("");
    } catch (e) {
      window.ui.showMessage(msg, e.message, "error");
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
  }

  load();
})();
