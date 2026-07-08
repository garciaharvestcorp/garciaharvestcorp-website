window.addEventListener("scroll", function () {
  const header = document.querySelector(".site-header");
  if (!header) return;

  header.classList.toggle("scrolled", window.scrollY > 80);
});

function initializeSite() {
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".main-nav");
  const brand = document.querySelector(".brand");

  if (header && nav && brand && !document.querySelector(".nav-toggle")) {
    const navToggle = document.createElement("button");
    navToggle.className = "nav-toggle";
    navToggle.type = "button";
    navToggle.setAttribute("aria-label", "Open navigation menu");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.innerHTML = '<span class="nav-toggle-icon" aria-hidden="true"></span><span>Menu</span>';
    brand.insertAdjacentElement("afterend", navToggle);

    navToggle.addEventListener("click", function () {
      const isOpen = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        header.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation menu");
      }
    });
  }

  document.querySelectorAll("img").forEach(function (image) {
    const markMissingImage = function () {
      const imageShell = image.closest(".product-image, .about-story-image, .mission-image, .featured-image, .gallery-card");
      if (imageShell) {
        imageShell.classList.add("is-missing");
      }

      const brandLink = image.closest(".brand");
      if (brandLink) {
        brandLink.classList.add("logo-missing");
      }
    };

    image.addEventListener("error", markMissingImage, { once: true });

    if (image.complete && image.naturalWidth === 0) {
      markMissingImage();
    }
  });

  const langBtn = document.querySelector(".lang-btn");
  if (!langBtn) return;

  const translations = {
    "index.html": "index-es.html",
    "about.html": "about-es.html",
    "products.html": "products-es.html",
    "gallery.html": "gallery-es.html",
    "contact.html": "contact-es.html",
    "index-es.html": "index.html",
    "about-es.html": "about.html",
    "products-es.html": "products.html",
    "gallery-es.html": "gallery.html",
    "contact-es.html": "contact.html"
  };

  langBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const page = window.location.pathname.split("/").pop() || "index.html";
    window.location.href = translations[page] || "index-es.html";
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSite);
} else {
  initializeSite();
}
