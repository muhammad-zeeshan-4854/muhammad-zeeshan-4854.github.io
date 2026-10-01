const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== Your photo =====
   EDIT: put your photo in the assets folder with this name.
   A square photo of at least 400 x 400 px works best. If the file is missing,
   "MZ" is shown instead. */
const PROFILE_PHOTO = "assets/profile.jpg";

/* ===== Integration hub =====
   EDIT: these are the services shown around you in the hero. */
const SERVICES = [
  { label: "DBS", title: "Disclosure and Barring Service" },
  { label: "DVLA", title: "Driving licence checks" },
  { label: "Passport", title: "Passport verification" },
  { label: "IDVT", title: "Identity document validation" },
  { label: "Konfir", title: "Employment and income verification" },
  { label: "Global", title: "Global checks" },
  { label: "Reference", title: "References module" },
  { label: "Social", title: "Social media screening" },
];

(function buildHub() {
  const svg = document.getElementById("hub");
  if (!svg) return;
  const NS = "http://www.w3.org/2000/svg";
  const C = 280, R = 208, CORE = 74, NODE = 42;
  const el = (tag, attrs, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };

  const defs = el("defs", {}, svg);
  const grad = el("linearGradient", { id: "coreGrad", x1: "0", y1: "0", x2: "1", y2: "1" }, defs);
  el("stop", { offset: "0", "stop-color": "#C9BFFF" }, grad);
  el("stop", { offset: "1", "stop-color": "#7C6CFF" }, grad);

  el("circle", { class: "orbit", cx: C, cy: C, r: R }, svg);
  el("circle", { class: "orbit", cx: C, cy: C, r: R - 90, style: "animation-direction: reverse" }, svg);

  const nodes = SERVICES.map((s, i) => {
    const a = (-90 + i * (360 / SERVICES.length)) * Math.PI / 180;
    const x = C + R * Math.cos(a), y = C + R * Math.sin(a);
    const x1 = C + CORE * Math.cos(a), y1 = C + CORE * Math.sin(a);
    const x2 = C + (R - NODE) * Math.cos(a), y2 = C + (R - NODE) * Math.sin(a);
    const len = Math.hypot(x2 - x1, y2 - y1);

    const g = el("g", { class: "node" }, svg);
    el("title", {}, g).textContent = s.title;
    el("line", { class: "wire", x1, y1, x2, y2 }, g);
    const pulse = el("line", { class: "pulse", x1, y1, x2, y2 }, g);
    pulse.style.setProperty("--end", `${-len}px`);
    pulse.style.setProperty("--d", `${(i * 0.33).toFixed(2)}s`);
    el("circle", { class: "node-bg", cx: x, cy: y, r: NODE }, g);
    el("text", { x, y }, g).textContent = s.label;
    const tick = el("g", { class: "tick" }, g);
    el("circle", { cx: x + 30, cy: y - 30, r: 11 }, tick);
    el("path", { d: `M${x + 25} ${y - 30} l3.5 3.5 l6 -7` }, tick);
    return g;
  });

  el("circle", { class: "core-ring", cx: C, cy: C, r: CORE + 14 }, svg);
  const core = el("g", { class: "core" }, svg);
  el("circle", { cx: C, cy: C, r: CORE, fill: "url(#coreGrad)" }, core);
  el("text", { x: C, y: C }, core).textContent = "MZ";

  // Photo inside the centre circle (falls back to "MZ" if the file is missing)
  const clip = el("clipPath", { id: "photoClip" }, defs);
  el("circle", { cx: C, cy: C, r: CORE - 4 }, clip);
  const photo = el("image", {
    href: PROFILE_PHOTO, x: C - CORE, y: C - CORE, width: CORE * 2, height: CORE * 2,
    preserveAspectRatio: "xMidYMid slice", "clip-path": "url(#photoClip)", class: "photo",
  }, core);
  photo.addEventListener("error", () => photo.remove());
  photo.addEventListener("load", () => core.classList.add("has-photo"));

  // One orchestrated moment: each service connects and verifies in turn.
  const count = document.getElementById("hub-count");
  nodes.forEach((n, i) => {
    const go = () => { n.classList.add("live"); count.textContent = i + 1; };
    reduceMotion ? go() : setTimeout(go, 700 + i * 420);
  });
})();

/* ===== Glow that follows the mouse ===== */
const glow = document.querySelector(".glow");
if (glow && !reduceMotion) {
  window.addEventListener("pointermove", (e) => {
    glow.style.setProperty("--mx", `${e.clientX}px`);
    glow.style.setProperty("--my", `${e.clientY}px`);
  }, { passive: true });
}

/* ===== Timeline fills as you scroll ===== */
const timeline = document.getElementById("timeline");
const roles = timeline ? [...timeline.querySelectorAll(".role")] : [];
function updateTimeline() {
  if (!timeline) return;
  const rect = timeline.getBoundingClientRect();
  const mark = window.innerHeight * 0.6;
  const pct = Math.min(Math.max((mark - rect.top) / rect.height, 0), 1);
  timeline.style.setProperty("--fill", `${pct * 100}%`);
  roles.forEach((r) => r.classList.toggle("reached", r.getBoundingClientRect().top + 14 < mark));
}
window.addEventListener("scroll", updateTimeline, { passive: true });
window.addEventListener("resize", updateTimeline);
updateTimeline();

/* ===== Count-up numbers and ECG line when they come into view ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const t = entry.target;
    observer.unobserve(t);
    if (t.classList.contains("ecg")) { t.classList.add("drawn"); return; }
    const target = Number(t.dataset.count);
    if (reduceMotion) { t.textContent = target; return; }
    const start = performance.now(), dur = 1100;
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      t.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    t.textContent = "0";
    requestAnimationFrame(step);
  });
}, { threshold: 0.4 });
document.querySelectorAll("[data-count], .ecg").forEach((n) => observer.observe(n));

/* ===== Copy email ===== */
const toast = document.querySelector(".toast");
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      toast.textContent = "Email copied";
    } catch {
      toast.textContent = btn.dataset.copy;
    }
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  });
});

/* ===== Dark / light toggle ===== */
const toggle = document.querySelector(".theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  themeMeta.setAttribute("content", theme === "dark" ? "#110E26" : "#F5F4FC");
}
applyTheme(document.documentElement.dataset.theme || "dark");
toggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch {}
});

document.getElementById("year").textContent = new Date().getFullYear();
