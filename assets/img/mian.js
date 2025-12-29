(function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeBtn");
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  const year = document.getElementById("year");

  year.textContent = new Date().getFullYear();

  // Theme: saved -> system -> default dark
  function getSystemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      themeBtn.querySelector(".icon").textContent = "☀";
    } else {
      root.removeAttribute("data-theme");
      themeBtn.querySelector(".icon").textContent = "☾";
    }
  }

  const saved = localStorage.getItem("theme");
  const initial = saved || getSystemTheme();
  applyTheme(initial);

  themeBtn.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });

  // Mobile menu
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // Close menu after click
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => nav.classList.remove("open"));
  });
})();
