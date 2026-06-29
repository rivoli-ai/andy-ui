/**
 * Theme helpers — mirror the behaviour of the original `andy-ui.js`:
 * persist the chosen theme and reflect it onto `<html data-theme>`.
 */
export type AndyTheme = "light" | "dark";

const STORAGE_KEY = "andy-ui-theme";

export function getTheme(): AndyTheme {
  if (typeof document === "undefined") return "light";
  const current = document.documentElement.dataset.theme;
  return current === "dark" ? "dark" : "light";
}

export function setTheme(theme: AndyTheme): void {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable — non-fatal */
  }
}

export function toggleTheme(): AndyTheme {
  const next: AndyTheme = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

/** Apply the persisted theme (or `fallback`) to <html>. Call once at startup. */
export function initTheme(fallback: AndyTheme = "light"): AndyTheme {
  if (typeof document === "undefined") return fallback;
  let stored: AndyTheme | null = null;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") stored = v;
  } catch {
    /* ignore */
  }
  const theme = stored ?? fallback;
  document.documentElement.dataset.theme = theme;
  return theme;
}
