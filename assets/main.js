(function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeBtn");
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  const year = document.getElementById("year");
  const lastUpdated = document.getElementById("lastUpdated");

  year.textContent = new Date().getFullYear();
  if (lastUpdated) {
    const lastMod = new Date(document.lastModified);
    const opts = { year: "numeric", month: "short", day: "numeric" };
    lastUpdated.textContent = lastMod.toLocaleDateString(undefined, opts);
  }

  // Theme: saved -> system
  function getSystemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      themeBtn.textContent = "☾";
      themeBtn.title = "Switch to dark";
    } else {
      root.removeAttribute("data-theme");
      themeBtn.textContent = "☀";
      themeBtn.title = "Switch to light";
    }
  }

  const saved = localStorage.getItem("theme");
  applyTheme(saved || getSystemTheme());

  themeBtn.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });

  // Mobile menu
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

  // Active section highlight on scroll
  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const map = links
    .map(a => ({ a, id: a.getAttribute("href").slice(1), el: document.getElementById(a.getAttribute("href").slice(1)) }))
    .filter(x => x.el);

  function onScroll() {
    const y = window.scrollY + 110;
    let cur = null;
    for (const x of map) {
      if (x.el.offsetTop <= y) cur = x;
    }
    links.forEach(a => a.style.background = "transparent");
    if (cur) {
      cur.a.style.background = "color-mix(in srgb, var(--panel2) 92%, transparent)";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
