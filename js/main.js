(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Header background on scroll */
  var header = document.getElementById("siteHeader");
  function updateHeader() {
    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* Mobile nav toggle */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  function closeNav() {
    navToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
  }

  navToggle.addEventListener("click", function () {
    var isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    mainNav.classList.toggle("is-open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  /* Reveal-on-scroll */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* Buy buttons that don't have a live link yet — avoid the href="#" jump-to-top */
  document.querySelectorAll("[data-coming-soon]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (link.getAttribute("href") === "#") e.preventDefault();
    });
  });

  /*
    Newsletter form — placeholder only.
    Replace this whole block once the real MailerLite embed/JS is in place;
    MailerLite's own script will handle submission and validation.
  */
  var newsletterForm = document.getElementById("newsletterForm");
  var nlNote = document.getElementById("nlNote");
  if (newsletterForm && newsletterForm.dataset.placeholder === "true") {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      nlNote.textContent = "Thanks! Sign-up isn't connected yet — check back soon.";
    });
  }
})();
