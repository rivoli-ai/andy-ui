import { nothing as n, html as i } from "lit";
import { property as c, customElement as b } from "lit/decorators.js";
import { d as h, A as v } from "../chunks/base-DPbIYdLL.js";
import "./icon.js";
var m = Object.defineProperty, f = Object.getOwnPropertyDescriptor, d = (p, t, a, l) => {
  for (var e = l > 1 ? void 0 : l ? f(t, a) : t, o = p.length - 1, r; o >= 0; o--)
    (r = p[o]) && (e = (l ? r(t, a, e) : r(e)) || e);
  return l && e && m(t, a, e), e;
};
let s = class extends v {
  constructor() {
    super(...arguments), this.collapsed = !1, this.collapsible = !0;
  }
  toggle() {
    this.collapsed = !this.collapsed, this.dispatchEvent(
      new CustomEvent("andy-collapse-toggle", { detail: this.collapsed, bubbles: !0, composed: !0 })
    );
  }
  render() {
    return i`
      <aside class="sidebar ${this.collapsed ? "collapsed" : ""}">
        <div class="sidebar-header">
          <div class="sidebar-header__top">
            ${this.slotTarget("brand")}
            ${this.collapsible ? i`<button class="sidebar-collapse-toggle" title="Collapse" aria-label="Collapse sidebar" @click=${this.toggle}>
                  <andy-icon name="chevronsLeft" size="sm"></andy-icon>
                </button>` : n}
          </div>
        </div>
        <nav class="sidebar-nav">${this.slotTarget()}</nav>
        ${this.hasSlot("footer") ? i`<div class="sidebar-footer">${this.slotTarget("footer")}</div>` : n}
      </aside>
    `;
  }
};
d([
  c({ type: Boolean, reflect: !0 })
], s.prototype, "collapsed", 2);
d([
  c({ type: Boolean })
], s.prototype, "collapsible", 2);
s = d([
  b("andy-sidebar")
], s);
h("andy-sidebar", s);
export {
  s as AndySidebar
};
//# sourceMappingURL=sidebar.js.map
