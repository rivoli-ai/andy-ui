import { Injectable } from "@angular/core";
import { toast, showToast, type AndyToastOptions } from "@andy-ui/core";

/**
 * Thin injectable wrapper around the core imperative toast API.
 *
 * @example
 *   constructor(private toast: ToastService) {}
 *   save() { this.toast.success("Settings saved"); }
 */
@Injectable({ providedIn: "root" })
export class ToastService {
  show(opts: AndyToastOptions) {
    return showToast(opts);
  }
  success(message?: string) {
    return toast.success(message);
  }
  info(message?: string) {
    return toast.info(message);
  }
  warning(message?: string) {
    return toast.warning(message);
  }
  error(message?: string) {
    return toast.error(message);
  }
}
