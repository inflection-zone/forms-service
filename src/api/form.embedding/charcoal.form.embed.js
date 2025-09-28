(function () {
  async function loadFormEmbed(container) {
    try {
      // Read form identifier from attribute
      const formId = container.getAttribute("charcoal-data-form-id");

      if (!formId) {
        container.innerHTML = `<p style="color:red;text-align:center;">No "charcoal-data-form-id" provided.</p>`;
        return;
      }

      // Call backend API with form identifier
      const response = await fetch(`{{THIS_BASE_URL}}/api/v1/form-embeddings/${formId}/submission`, {
        method: "GET"
      });

      if (!response.ok) throw new Error("Failed to fetch form details");

      const data_ = await response.json();
      const data = data_.Data;

      // Create wrapper
      const formContainer = document.createElement("div");
      formContainer.style.width = "100%";
      formContainer.style.maxWidth = "900px";
      formContainer.style.margin = "0 auto";
      formContainer.style.border = "1px solid #ccc";
      formContainer.style.borderRadius = "8px";
      formContainer.style.overflow = "hidden";

      // Header
      const header = document.createElement("div");
      header.textContent = data.Title || `Form ${data.id}`;
      header.style.padding = "10px";
      header.style.background = "#f4f4f4";
      header.style.fontSize = "18px";
      header.style.fontWeight = "bold";
      header.style.textAlign = "center";
      formContainer.appendChild(header);

      // iFrame
      const iframe = document.createElement("iframe");
      iframe.src = data.Link;
      iframe.style.width = "100%";
      iframe.style.minHeight = "700px";
      iframe.style.border = "none";
      iframe.allow = "fullscreen";
      formContainer.appendChild(iframe);

      // Replace placeholder container
      container.innerHTML = "";
      container.appendChild(formContainer);

    } catch (err) {
      container.innerHTML = `<p style="color:red;text-align:center;">Error loading form: ${err.message}</p>`;
    }
  }

  // Auto-run for all placeholders
  document.addEventListener("DOMContentLoaded", () => {
    const placeholders = document.querySelectorAll(".charcoal-form-embed");
    placeholders.forEach(container => {
      loadFormEmbed(container);
    });
  });
})();
