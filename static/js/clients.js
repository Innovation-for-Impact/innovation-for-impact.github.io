document.addEventListener("DOMContentLoaded", () => {
  fetch("/static/data/clients.json", { cache: "no-store" })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load clients.json");
      return res.json();
    })
    .then(renderClientsPage)
    .catch((err) => {
      console.error("Error loading clients data:", err);
    });
});

function renderClientsPage(data) {
  renderHero(data.summary, data.logos);
  renderExperience(data.experience);
  renderTestimonials(data.testimonials);
  renderProjects(data.projects);
  renderCTA(data.cta);
}

/* ---------- HERO ---------- */

function renderHero(summary = {}, logos = []) {
  // Stat
  const statEl = document.getElementById("clients-stat");
  if (statEl) {
    statEl.innerHTML = `
      <span class="clients-stat-number">${summary.statNumber || ""}</span>
      <span class="clients-stat-label">${summary.statLabel || ""}</span>
    `;
  }

  // Intro
  const introEl = document.getElementById("clients-intro");
  if (introEl && summary.intro) {
    introEl.textContent = summary.intro;
  }

  // Logos
  const logoGrid = document.getElementById("clients-logo-grid");
  if (!logoGrid || !Array.isArray(logos)) return;

  logoGrid.innerHTML = logos
    .map((logo) => {
      const content = logo.image
        ? `<img src="${logo.image}" alt="${logo.name || "Client"}">`
        : `<span>${logo.initials || logo.name || "Client"}</span>`;

      const wrapperTag = logo.url ? "a" : "div";
      const hrefAttr = logo.url
        ? `href="${logo.url}" target="_blank" rel="noopener noreferrer"`
        : "";

      return `<${wrapperTag} class="client-logo-card" ${hrefAttr}>${content}</${wrapperTag}>`;
    })
    .join("");
}

/* ---------- EXPERIENCE ---------- */

/* ---------- EXPERIENCE ---------- */

function renderExperience(experience = []) {
  const listEl = document.getElementById("experience-list");
  if (!listEl || !Array.isArray(experience)) return;

  listEl.innerHTML = experience
    .map((item, idx) => {
      const id = `exp-item-${idx}`;
      return `
        <li class="experience-item" id="${id}">
          <button
            class="experience-header"
            type="button"
            aria-expanded="false"
          >
            <span class="experience-title">${item.label || ""}</span>
            <span class="experience-toggle-icon">+</span>
          </button>
          <div class="experience-body">
            <div class="experience-body-inner">
              ${item.description || ""}
            </div>
          </div>
        </li>
      `;
    })
    .join("");

  setupExperienceAccordions();
}

function setupExperienceAccordions() {
  const items = document.querySelectorAll(".experience-item");

  items.forEach((item) => {
    const header = item.querySelector(".experience-header");
    const body = item.querySelector(".experience-body");
    if (!header || !body) return;

    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // close all others (if you want only one open at a time)
      document.querySelectorAll(".experience-item.open").forEach((openItem) => {
        if (openItem === item) return;
        openItem.classList.remove("open");
        const btn = openItem.querySelector(".experience-header");
        const panel = openItem.querySelector(".experience-body");
        if (btn) btn.setAttribute("aria-expanded", "false");
        if (panel) panel.style.maxHeight = "0px";
      });

      // toggle this one
      if (!isOpen) {
        item.classList.add("open");
        header.setAttribute("aria-expanded", "true");
        body.style.maxHeight = body.scrollHeight + "px";
      } else {
        item.classList.remove("open");
        header.setAttribute("aria-expanded", "false");
        body.style.maxHeight = "0px";
      }
    });
  });
}


/* ---------- TESTIMONIALS ---------- */

function renderTestimonials(testimonials = []) {
  const gridEl = document.getElementById("testimonials-grid");
  if (!gridEl || !Array.isArray(testimonials)) return;

  gridEl.innerHTML = testimonials
    .map(
      (t) => `
      <article class="testimonial-card">
        <h3>${t.name || ""}</h3>
        ${t.role ? `<p class="testimonial-role">${t.role}</p>` : ""}
        <p class="testimonial-quote">“${t.quote || ""}”</p>
      </article>
    `
    )
    .join("");
}

/* ---------- PROJECTS ---------- */

function renderProjects(projects = {}) {
  const internalEl = document.getElementById("internal-projects");
  const externalEl = document.getElementById("external-projects");

  if (internalEl && Array.isArray(projects.internal)) {
    internalEl.innerHTML = projects.internal.map(projectCardHTML).join("");
  }

  if (externalEl && Array.isArray(projects.external)) {
    externalEl.innerHTML = projects.external.map(projectCardHTML).join("");
  }
}

function projectCardHTML(p = {}) {
  const type = p.type || "";
  const tagClass = type.toLowerCase().includes("external")
    ? "project-tag project-tag--external"
    : "project-tag";

  const thumbContent = p.thumbImage
    ? `<img src="${p.thumbImage}" alt="${p.name || ""}">`
    : (p.thumbLetter || (p.name && p.name[0]) || "");

  const thumbClass = p.thumbImage ? "project-thumb project-thumb--transparent" : "project-thumb";

  const linkHtml = p.link
    ? `<a class="project-link" href="${p.link}" target="_blank" rel="noopener noreferrer">View project</a>`
    : "";

  return `
    <article class="project-card">
      <div class="${thumbClass}">${thumbContent}</div>
      <div class="project-body">
        <h3 class="project-title">${p.name || ""}</h3>
        ${type ? `<p class="${tagClass}">${type}</p>` : ""}
        ${p.description ? `<p class="project-desc">${p.description}</p>` : ""}
        ${linkHtml}
      </div>
    </article>
  `;
}

/* ---------- CTA ---------- */

function renderCTA(cta = {}) {
  const ctaEl = document.querySelector(".clients-cta");
  if (!ctaEl) return;

  ctaEl.innerHTML = `
    <h2>${cta.title || "Interested?"}</h2>
    <p>${cta.body || "Reach out and we’d love to discuss what IFI can build for you."}</p>
    <a href="${cta.buttonHref || "/pages/contact-us.html"}" class="clients-cta-button">
      ${cta.buttonText || "Contact Us"}
    </a>
  `;
}
