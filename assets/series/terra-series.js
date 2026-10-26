/* Terra Series: one shared definition of every project, rendered on every Terra site.
 *
 * Project pages:  <div data-terra-series="terrazero"></div>   (tabs for every project, in series order)
 * Homepage:       <div data-terra-series-cards></div> and <div data-terra-series-sections></div>
 * Every site:     <footer class="site-footer" data-terra-series-footer></footer>
 * Load with:      <script src="/assets/series/terra-series.js" defer></script>
 * All project sites are served under terra-applied.github.io, so root-relative paths resolve here.
 */
(function () {
  "use strict";

  var BASE = "/assets/series/";

  // Chronological order. Titles are the official paper titles.
  var PROJECTS = [
    {
      id: "terrazero",
      name: "TerraZero",
      title: "Procedural Driving Simulation for Zero-Demonstration Self-Play at Scale",
      badge: "Technical Report",
      summary: "Developing state-of-the-art autonomous planners and simulation agents through self-play: powered by a reactive, high-throughput simulator executing millions of steps per second, alongside a procedural engine that generates an endless supply of edge cases, all at a minimal cost.",
      description: "A fast object-level simulator and a procedural scenario engine that treat logged data as a starting point, not a ceiling, bootstrapping real maps and logs into an effectively unlimited supply of low-cost, high-value scenarios. A compute-efficient self-play recipe learns from that stream through trial and error, without human demonstrations. The resulting policies reach state-of-the-art closed-loop performance and transfer zero-shot across cities and datasets.",
      links: [
        ["Project Page →", "https://terra-applied.github.io/TerraZero/"],
        ["arXiv", "https://arxiv.org/abs/2607.13028"]
      ],
      video: "terrazero.mp4"
    },
    {
      id: "terratransfer",
      name: "TerraTransfer",
      title: "Learning End-to-End Driving Policies Without Expert Demonstrations",
      badge: "Technical Report",
      summary: "Teaching an end-to-end driving policy with the highly generalizable and robust planner from self-play, transferring the competence of the TerraZero policy to camera input without imitating human demonstrations.",
      description: "TerraTransfer uses TerraZero's self-play planner as a teacher and distills its competence into an end-to-end camera policy, with no human demonstrations. It aligns the vision policy's latent space to the planner's vector representation, achieving 0.490 HD-Score on HUGSim nuScenes and outperforming imitation baselines by +0.130.",
      links: [
        ["Project Page →", "https://terra-applied.github.io/TerraTransfer/"],
        ["arXiv", "https://arxiv.org/abs/2606.17386"]
      ],
      video: "terratransfer.mp4"
    },
    {
      id: "terratransfer-pp",
      name: "TerraTransfer++",
      title: "Demonstration-Free End-to-End Planner",
      badge: "Technical Report",
      summary: "Scaling TerraTransfer to an end-to-end planner with zero human demonstrations, setting state-of-the-art results on HUGSim, NAVSIM navtest and navhard.",
      description: "TerraTransfer++ scales TerraTransfer: the same self-play pretraining also yields an end-to-end planner. With zero human demonstrations, its camera-only policies set state-of-the-art results on HUGSim, NAVSIM navtest and navhard.",
      links: [
        ["Project Page →", "https://terra-applied.github.io/TerraTransferPlusPlus/"],
        ["arXiv", "https://arxiv.org/abs/2610.30319"]
      ],
      video: "terratransfer-pp.mp4"
    },
    {
      id: "spacer",
      name: "SPACeR",
      title: "Self-Play Anchoring with Centralized Reference Models",
      badge: "ICLR 2026",
      summary: "Human-like, reactive simulation agents via self-play anchored to a reference model: cheap, realistic traffic to train against.",
      description: "SPACeR anchors TerraZero's self-play to a pretrained tokenized reference model, producing sim agents that are simultaneously human-like and reactive. The policy is ~50× smaller than tokenized baselines with 10× faster inference, and outperforms prior self-play and imitation methods on the Waymo Sim Agents Challenge.",
      links: [
        ["Project Page →", "https://terra-applied.github.io/SPACeR/"],
        ["arXiv", "https://arxiv.org/abs/2510.18060"],
        ["OpenReview", "https://openreview.net/forum?id=Q5H3NCy18S"]
      ],
      video: "spacer.mp4"
    }
  ];

  var CSS = [
    ".ts{--ts-sans:var(--font-sans,system-ui,-apple-system,\"Segoe UI\",sans-serif);--ts-blue:var(--blue,#006CFA);--ts-ink:var(--ink,#111);--ts-line:var(--gray-line,#e3e6eb);--ts-soft:var(--gray-soft,#f3f5f8);margin-top:1.5rem}",
    ".ts-tabs{position:relative;display:inline-flex;flex-wrap:wrap;gap:4px;margin-bottom:1.5rem;padding:5px;background:var(--ts-soft);border:1px solid var(--ts-line);border-radius:999px}",
    ".ts-tab{border:0;background:transparent;cursor:pointer;font-family:var(--ts-sans);font-size:.95rem;font-weight:600;color:var(--ts-ink);padding:.5em 1.1em;border-radius:999px;transition:color .2s,background .2s}",
    ".ts-tab:hover{color:var(--ts-blue)}",
    ".ts-tab[aria-selected=true]{background:var(--ts-blue);color:#fff}",
    ".ts-panel{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(1.5rem,4vw,3rem);align-items:center}",
    ".ts-panel[hidden]{display:none}",
    ".ts-panel h3{margin:0 0 .6rem}",
    ".ts-panel p{margin:0 0 1rem}",
    ".ts-badge{font-family:var(--ts-sans);display:table;margin:.45rem 0 0;font-size:.72rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;padding:.2em .6em;border-radius:999px;background:#e8f0ff;color:#1a4ac4}",
    ".ts-head{margin-bottom:.8rem}",
    ".ts-links{display:flex;flex-wrap:wrap;gap:.5rem}",
    ".ts-btn{font-family:var(--ts-sans);display:inline-block;padding:.5em 1em;border-radius:8px;border:1px solid var(--ts-line);background:#fff;color:var(--ts-ink);font-size:.9rem;font-weight:600;text-decoration:none}",
    ".ts-btn:hover{border-color:var(--ts-blue);color:var(--ts-blue)}",
    ".ts-btn.ts-primary{background:var(--ts-blue);border-color:var(--ts-blue);color:#fff}",
    ".ts-media{aspect-ratio:16/9;border:1px solid var(--ts-line);border-radius:12px;overflow:hidden;background:#0d1117}",
    ".ts-media video{display:block;width:100%;height:100%;object-fit:contain}",
    "@media (max-width:800px){.ts-panel{grid-template-columns:1fr}}"
  ].join("\n");

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function links(p, btn, primary) {
    return p.links.map(function (l, i) {
      return '<a class="' + btn + (i === 0 ? " " + primary : "") + '" href="' + esc(l[1]) +
        '" target="_blank" rel="noopener">' + esc(l[0]) + "</a>";
    }).join("");
  }

  function video(p, cls, autoplay) {
    return '<video class="' + cls + '" muted loop playsinline ' + (autoplay ? "autoplay " : "") + 'preload="metadata" controls controlslist="nodownload" src="' +
      BASE + p.video + '#t=0.5"></video>';
  }

  // Tabs for every project in the fixed series order; videos play only on the visible tab.
  function renderTabs(root) {
    var projects = PROJECTS;
    var html = '<div class="ts"><div class="ts-tabs" role="tablist" aria-label="Terra Series projects">';
    projects.forEach(function (p, i) {
      html += '<button type="button" class="ts-tab" role="tab" id="ts-tab-' + p.id + '" aria-controls="ts-panel-' + p.id +
        '" aria-selected="' + (i === 0) + '">' + esc(p.name) + "</button>";
    });
    html += "</div>";
    projects.forEach(function (p, i) {
      html += '<div class="ts-panel" role="tabpanel" id="ts-panel-' + p.id + '" aria-labelledby="ts-tab-' + p.id + '"' +
        (i === 0 ? "" : " hidden") + '><div><div class="ts-head"><h3>' + esc(p.title) + '</h3><span class="ts-badge">' +
        esc(p.badge) + "</span></div><p>" + esc(p.description) + '</p><div class="ts-links">' + links(p, "ts-btn", "ts-primary") +
        '</div></div><div class="ts-media">' + video(p, "") + "</div></div>";
    });
    root.innerHTML = html + "</div>";

    var tabs = root.querySelectorAll(".ts-tab");
    Array.prototype.forEach.call(tabs, function (tab) {
      tab.addEventListener("click", function () {
        Array.prototype.forEach.call(tabs, function (t) {
          var on = t === tab;
          var panel = document.getElementById(t.getAttribute("aria-controls"));
          t.setAttribute("aria-selected", on);
          panel.hidden = !on;
          var v = panel.querySelector("video");
          if (on) play(v); else v.pause();
        });
      });
    });

    // Autoplay the visible tab's video while the section is on screen.
    var current = function () { return root.querySelector(".ts-panel:not([hidden]) video"); };
    if (!("IntersectionObserver" in window)) { play(current()); return; }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = current();
        if (e.isIntersecting) play(v); else v.pause();
      });
    }, { threshold: 0.25 }).observe(root);
  }

  function play(v) {
    v.muted = true;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }

  // Homepage cards, using the homepage's own classes.
  function renderCards(root) {
    root.innerHTML = PROJECTS.map(function (p) {
      return '<a class="series-card" href="#' + p.id + '"><span class="sc-name">' + esc(p.name) +
        ' <span class="series-badge">' + esc(p.badge) + '</span></span><span class="sc-tag">' + esc(p.summary) +
        '</span><span class="sc-foot"><span class="sc-arrow">View →</span></span></a>';
    }).join("");
  }

  // Homepage sections, alternating text and media sides.
  function renderSections(root) {
    root.innerHTML = PROJECTS.map(function (p, i) {
      return '<section id="' + p.id + '"><div class="wide"><div class="spread' + (i % 2 ? " spread--rev" : "") +
        '"><div class="spread-body"><p class="eyebrow">' + esc(p.name) + " · " + esc(p.badge) + "</p><h2>" + esc(p.title) +
        '</h2><p class="spread-lead">' + esc(p.description) + '</p><div class="series-links actions">' +
        links(p, "btn", "btn-primary") + '</div></div><div class="spread-media"><div class="intg-media">' +
        video(p, "intg-video", true) + "</div></div></div></div></section>";
    }).join("");
  }

  // Footer shared by every Terra site, using the sites' common footer classes.
  function renderFooter(root) {
    var row = function (label, href, ext) {
      return '<p style="margin:.2rem 0"><a href="' + href + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(label) + "</a></p>";
    };
    root.innerHTML = '<div class="wide"><div class="foot-grid"><div>' +
      '<a class="brand-mark" style="color:#fff;height:auto" href="https://terra-applied.github.io/">Terra Series</a>' +
      '<p style="max-width:40ch;color:#cfd3da">Empowering physical AI at the scale of simulation. A research program at Applied Intuition.</p></div>' +
      '<div><p style="margin:0 0 .4rem;font-weight:600">Projects</p>' +
      PROJECTS.map(function (p) { return row(p.name, p.links[0][1]); }).join("") + "</div>" +
      '<div><p style="margin:0 0 .4rem;font-weight:600">Applied Intuition</p>' +
      row("Research", "https://www.appliedintuition.com/research", true) +
      row("Careers", "https://www.appliedintuition.com/careers", true) +
      row("appliedintuition.com", "https://www.appliedintuition.com", true) + "</div>" +
      '</div><p class="copyright">© 2026 Applied Intuition. All rights reserved.</p></div>';
  }

  function init() {
    var tabRoots = document.querySelectorAll("[data-terra-series]");
    if (tabRoots.length) {
      var style = document.createElement("style");
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    Array.prototype.forEach.call(tabRoots, renderTabs);
    Array.prototype.forEach.call(document.querySelectorAll("[data-terra-series-cards]"), renderCards);
    Array.prototype.forEach.call(document.querySelectorAll("[data-terra-series-sections]"), renderSections);
    Array.prototype.forEach.call(document.querySelectorAll("[data-terra-series-footer]"), renderFooter);
    keepHashTarget();
  }

  // The browser jumps to #hash before rendered sections and late media settle the layout; jump again once they do.
  function keepHashTarget() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    var jump = function () {
      var el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
    };
    jump();
    if (document.readyState === "complete") return;
    var userScrolled = false;
    var stop = function () { userScrolled = true; };
    ["wheel", "touchstart", "keydown"].forEach(function (t) { window.addEventListener(t, stop, { once: true, passive: true }); });
    window.addEventListener("load", function () { if (!userScrolled) jump(); });
  }

  // Render now when loaded after the placeholders, so page scripts (e.g. lazy video playback) see the result.
  if (document.querySelector("[data-terra-series],[data-terra-series-cards],[data-terra-series-sections],[data-terra-series-footer]")) init();
  else document.addEventListener("DOMContentLoaded", init);
})();
