import { initTheme, toggleTheme } from "./theme";
import { initReveal } from "./reveal";
import { enhanceViewTransitions } from "./viewtransitions";

function syncThemeUI() {
  const isDark = document.documentElement.classList.contains("dark");
  document.querySelectorAll<HTMLElement>("[data-theme-icon]").forEach((el) => {
    el.textContent = isDark ? "☀" : "☾";
  });
  document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(isDark));
  });
}

function bindThemeToggle() {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement | null;
    const btn = target?.closest?.("[data-theme-toggle]") as HTMLButtonElement | null;
    if (!btn) return;

    toggleTheme();
    syncThemeUI();
  });
}

initTheme();
syncThemeUI();
bindThemeToggle();

initReveal();
enhanceViewTransitions();