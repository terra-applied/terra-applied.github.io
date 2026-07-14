/* Terra Series umbrella site — slim orchestration.
   Wires the mobile nav, scroll-spy, scroll-reveal, and lazy video playback.
   No build step; everything is progressive enhancement over the static HTML. */
(function () {
  "use strict";

  // ---- navigation: mobile toggle + scroll-spy ------------------------------
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("nav");
    if (toggle && nav) {
      // the full-screen overlay menu locks page scroll while open
      var setMenu = function (open) {
        nav.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Close navigation" : "Toggle navigation");
        document.body.classList.toggle("nav-open", open);
      };
      toggle.addEventListener("click", function () {
        setMenu(!nav.classList.contains("open"));
      });
      nav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { setMenu(false); });
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("open")) setMenu(false);
      });
    }

    // highlight the nav link for the section currently in view. Only in-page
    // anchors participate (skip external links like Research ↗).
    var links = Array.prototype.slice.call(document.querySelectorAll("#nav a"))
      .filter(function (a) { return (a.getAttribute("href") || "").charAt(0) === "#"; });
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var sec = document.getElementById(id);
      if (sec) map[id] = a;
    });
    var sections = Object.keys(map).map(function (id) { return document.getElementById(id); });
    if (!("IntersectionObserver" in window) || !sections.length) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          var a = map[e.target.id];
          if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { obs.observe(s); });
  }

  // ---- scroll reveal -------------------------------------------------------
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (i) { i.classList.add("in"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    items.forEach(function (i) { obs.observe(i); });
  }

  // ---- lazy video playback -------------------------------------------------
  // The spread videos carry no `autoplay` attribute; we start each one only
  // while it is on screen and pause it when it leaves, so the page never
  // streams five clips at once. Plays are muted, so autoplay policies allow it.
  function initVideos() {
    var vids = Array.prototype.slice.call(document.querySelectorAll("video"));
    if (!vids.length) return;
    if (!("IntersectionObserver" in window)) {
      vids.forEach(function (v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          var p = v.play();
          if (p && p.catch) p.catch(function () { /* user gesture may be required */ });
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25 });
    vids.forEach(function (v) { obs.observe(v); });
  }

  function boot() {
    initNav();
    initReveal();
    initVideos();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
