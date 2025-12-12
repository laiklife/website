const KEY = "theme";

export function initTheme() {
  const stored = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  const shouldDark = stored ? stored === "dark" : !!prefersDark;
  document.documentElement.classList.toggle("dark", shouldDark);
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem(KEY, isDark ? "dark" : "light");
}