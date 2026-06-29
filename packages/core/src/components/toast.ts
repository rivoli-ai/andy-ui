import { icons, type IconName } from "../internal/icons.js";
import { render, html } from "lit";

export type AndyToastType = "success" | "info" | "warning" | "error";

export interface AndyToastOptions {
  type?: AndyToastType;
  title?: string;
  message?: string;
  /** Auto-dismiss after this many ms. 0 keeps it until dismissed. Default 4200. */
  duration?: number;
}

const DEFAULT_TITLES: Record<AndyToastType, string> = {
  success: "Success",
  info: "Notice",
  warning: "Warning",
  error: "Error",
};
const TYPE_ICON: Record<AndyToastType, IconName> = {
  success: "check",
  info: "info",
  warning: "warning",
  error: "error",
};

let host: HTMLElement | null = null;
function ensureHost(): HTMLElement {
  if (host && host.isConnected) return host;
  host = document.getElementById("toast-host") as HTMLElement | null;
  if (!host) {
    host = document.createElement("div");
    host.id = "toast-host";
    document.body.appendChild(host);
  }
  return host;
}

function dismiss(el: HTMLElement) {
  el.style.animation = "ds-toast-out 0.25s ease forwards";
  setTimeout(() => el.remove(), 260);
}

/**
 * Imperatively show a toast. This is the primitive the React `useToast` hook
 * and the Angular `ToastService` wrap.
 */
export function showToast(opts: AndyToastOptions = {}): () => void {
  if (typeof document === "undefined") return () => {};
  const type = opts.type ?? "info";
  const title = opts.title ?? DEFAULT_TITLES[type];
  const message = opts.message ?? "";
  const duration = opts.duration ?? 4200;

  const el = document.createElement("div");
  el.className = `dp-toast ${type}`;
  el.style.animation = "ds-toast-in 0.3s cubic-bezier(0.34,1.56,0.64,1)";

  const close = () => dismiss(el);
  render(
    html`
      <div class="icon-box" style="--ts-w:18px">${icons[TYPE_ICON[type]]()}</div>
      <div class="body">
        <div class="title">${title}</div>
        ${message ? html`<div class="msg">${message}</div>` : null}
      </div>
      <button class="close" aria-label="Dismiss" @click=${close}>${icons.close()}</button>
    `,
    el
  );

  ensureHost().appendChild(el);
  if (duration > 0) setTimeout(close, duration);
  return close;
}

export const toast = {
  show: showToast,
  success: (message?: string, opts?: Omit<AndyToastOptions, "type" | "message">) =>
    showToast({ ...opts, type: "success", message }),
  info: (message?: string, opts?: Omit<AndyToastOptions, "type" | "message">) =>
    showToast({ ...opts, type: "info", message }),
  warning: (message?: string, opts?: Omit<AndyToastOptions, "type" | "message">) =>
    showToast({ ...opts, type: "warning", message }),
  error: (message?: string, opts?: Omit<AndyToastOptions, "type" | "message">) =>
    showToast({ ...opts, type: "error", message }),
};
