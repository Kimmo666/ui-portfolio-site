(function setYear() {
  const node = document.querySelector("[data-year]");
  if (node) node.textContent = String(new Date().getFullYear());
})();

(function wireContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    const subject = encodeURIComponent("Portfolio Inquiry from " + (name || "Visitor"));
    const body = encodeURIComponent(
      "Name: " +
        name +
        "\nEmail: " +
        email +
        "\n\nMessage:\n" +
        message
    );
    window.location.href = "mailto:gkweb@foxmail.com?subject=" + subject + "&body=" + body;
  });
})();

(function wirePortfolioAssets() {
  const images = Array.from(document.querySelectorAll("img[data-asset]"));
  if (images.length === 0) return;

  images.forEach((image) => {
    const asset = (image.dataset.asset || "").trim();
    if (!asset) return;

    const ext = (image.dataset.ext || "jpg").trim();
    const fallbackSrc = image.getAttribute("src") || "";
    const localSrc = "assets/works/" + asset + "." + ext;

    image.dataset.fallbackSrc = fallbackSrc;
    image.src = localSrc;

    image.addEventListener("error", () => {
      const fallback = image.dataset.fallbackSrc || "";
      if (fallback && image.src !== fallback) {
        image.src = fallback;
      }
    });
  });
})();

(function wireHomeLayoutToggle() {
  const wall = document.querySelector("[data-home-wall]");
  const group = document.querySelector('[data-layout-group="home"]');
  if (!wall || !group) return;

  const buttons = Array.from(group.querySelectorAll("[data-home-layout]"));
  const storageKey = "homeGalleryLayout";

  function applyLayout(layout) {
    const mode = layout === "masonry" ? "masonry" : "magazine";
    wall.classList.toggle("home-layout-masonry", mode === "masonry");

    buttons.forEach((button) => {
      const active = button.getAttribute("data-home-layout") === mode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  const saved = window.localStorage.getItem(storageKey);
  applyLayout(saved || "magazine");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.getAttribute("data-home-layout") || "magazine";
      applyLayout(mode);
      window.localStorage.setItem(storageKey, mode);
    });
  });
})();

(function wireWorkFilters() {
  const filterGroup = document.querySelector('[data-filter-group="works"]');
  const shots = Array.from(document.querySelectorAll(".masonry [data-category]"));
  if (!filterGroup || shots.length === 0) return;

  const buttons = Array.from(filterGroup.querySelectorAll("[data-filter]"));
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.getAttribute("data-filter") || "all";
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      shots.forEach((shot) => {
        const categories = (shot.getAttribute("data-category") || "").split(/\s+/).filter(Boolean);
        const visible = selected === "all" || categories.includes(selected);
        shot.hidden = !visible;
      });
    });
  });
})();

(function wireLightbox() {
  const images = Array.from(document.querySelectorAll(".photo-media"));
  if (images.length === 0) return;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML =
    '<button type="button" aria-label="关闭预览">关闭</button><img alt="" />';
  document.body.appendChild(lightbox);

  const closeBtn = lightbox.querySelector("button");
  const preview = lightbox.querySelector("img");

  function closeLightbox() {
    lightbox.classList.remove("open");
    preview.src = "";
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });

  images.forEach((image) => {
    image.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      preview.src = image.currentSrc || image.src;
      preview.alt = image.alt || "作品大图预览";
      lightbox.classList.add("open");
    });
  });
})();
