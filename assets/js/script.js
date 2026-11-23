(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile navigation toggle
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "பட்டியலை மூடு" : "பட்டியலைத் திற");
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close menu after choosing a link
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }


  // Home links: instant jump to the absolute top (no smooth scrolling).
  document.querySelectorAll("a.home-link").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      var pt = document.getElementById("page-top");
      if (pt) pt.focus({ preventScroll: true });
      if (nav) setMenu(false);
    });
  });

  // Highlight the nav link for the section in view
  var links = document.querySelectorAll(".primary-nav ul a");
  var sections = Array.prototype.map.call(links, function (a) {
    return document.querySelector(a.getAttribute("href"));
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (sec) {
      if (sec && sec.id) observer.observe(sec);
    });
  }
})();
