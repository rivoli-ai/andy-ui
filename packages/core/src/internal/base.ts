import { LitElement, type PropertyValues } from "lit";

/**
 * Base class for all Andy-UI elements.
 *
 * We render into the **light DOM** (not a shadow root) on purpose: the whole
 * design system is a global stylesheet (`@andy-ui/tokens`) built around global
 * (often cross-component) class selectors and CSS custom properties driven by
 * `[data-theme]` on <html>. Light-DOM rendering lets every component reuse that
 * stylesheet verbatim and theme through the normal cascade — shadow DOM would
 * scope those selectors away.
 *
 * Light DOM has no real `<slot>`, yet we still need to project author children
 * into our rendered chrome (e.g. a button label inside `<button class="btn">`).
 * We do this **race-free across frameworks** as follows:
 *
 *   - Lit renders into a dedicated `display:contents` "chrome wrapper" that is a
 *     child of the host (see {@link createRenderRoot}). Because Lit only ever
 *     touches that wrapper, the host's *other* direct children — the author's
 *     content — are never clobbered, whenever the framework inserts them.
 *   - Author children are therefore trivially identifiable: every direct child
 *     of the host except the wrapper. We relocate them into `display:contents`
 *     "slot target" spans inside the chrome (see {@link slotTarget}), driven by
 *     a MutationObserver so it works whether children arrive before or after the
 *     element upgrades/connects (React inserts early; Angular inserts late).
 */
export class AndyElement extends LitElement {
  #chrome!: HTMLElement;
  #targets = new Map<string, HTMLElement>();
  #seenSlots = new Set<string>();
  #observer?: MutationObserver;

  protected override createRenderRoot(): HTMLElement {
    const chrome = document.createElement("span");
    chrome.setAttribute("data-andy-chrome", "");
    chrome.style.display = "contents";
    this.appendChild(chrome);
    this.#chrome = chrome;
    return chrome;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (!this.#observer) {
      this.#observer = new MutationObserver(() => this.#projectAuthorNodes());
      this.#observer.observe(this, { childList: true });
    }
    this.#projectAuthorNodes();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#observer?.disconnect();
    this.#observer = undefined;
  }

  /**
   * A persistent, transparent projection target for the given slot name (`""`
   * is the default slot). Render it in your template, e.g.
   * `html`<button class="btn">${this.slotTarget()}</button>``.
   */
  protected slotTarget(name = ""): HTMLElement {
    let target = this.#targets.get(name);
    if (!target) {
      target = document.createElement("span");
      target.setAttribute("data-andy-slot", name);
      target.style.display = "contents";
      this.#targets.set(name, target);
    }
    return target;
  }

  /** Whether any author child targets the given slot (`""` = default). */
  protected hasSlot(name = ""): boolean {
    return this.#seenSlots.has(name);
  }

  /** Move author children (every direct child except the chrome) into targets. */
  #projectAuthorNodes(): void {
    const authors = Array.from(this.childNodes).filter((n) => n !== this.#chrome);
    if (!authors.length) return;

    let slotsChanged = false;
    for (const node of authors) {
      const name = slotNameOf(node);
      if (!this.#seenSlots.has(name)) {
        this.#seenSlots.add(name);
        slotsChanged = true;
      }
    }
    // Re-render so `hasSlot()`-gated chrome (and its slot target) exists.
    if (slotsChanged) this.requestUpdate();

    for (const node of authors) {
      const target = this.#targets.get(slotNameOf(node)) ?? this.#targets.get("");
      if (target && node.parentNode !== target) target.appendChild(node);
    }
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    // After (re)rendering, targets created during render now exist — project.
    this.#projectAuthorNodes();
  }
}

function slotNameOf(node: Node): string {
  return node.nodeType === Node.ELEMENT_NODE ? (node as Element).getAttribute("slot") || "" : "";
}

/** Register a custom element once, tolerating duplicate imports / HMR. */
export function define(tag: string, ctor: CustomElementConstructor): void {
  if (typeof customElements === "undefined") return;
  if (!customElements.get(tag)) {
    customElements.define(tag, ctor);
  }
}
