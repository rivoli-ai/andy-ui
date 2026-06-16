import { nothing as r, html as a } from "lit";
import { property as s, customElement as b } from "lit/decorators.js";
import { d as m, A as y } from "../chunks/base-DPbIYdLL.js";
import "./icon.js";
import "./icon-chip.js";
import "./avatar.js";
import "./header.js";
import "./footer.js";
var g = Object.defineProperty, v = Object.getOwnPropertyDescriptor, e = (u, l, p, d) => {
  for (var t = d > 1 ? void 0 : d ? v(l, p) : l, c = u.length - 1, h; c >= 0; c--)
    (h = u[c]) && (t = (d ? h(l, p, t) : h(t)) || t);
  return d && t && g(l, p, t), t;
};
let o = class extends y {
  constructor() {
    super(...arguments), this.collapsed = !1, this.collapsible = !0;
  }
  toggle() {
    this.collapsed = !this.collapsed, this.dispatchEvent(
      new CustomEvent("andy-collapse-toggle", { detail: this.collapsed, bubbles: !0, composed: !0 })
    );
  }
  render() {
    return a`
      <aside class="sidebar ${this.collapsed ? "collapsed" : ""}">
        <andy-header class="sidebar-header">
          <div class="sidebar-brand">${this.slotTarget("brand")}</div>
          ${this.collapsible ? a`<button slot="actions" class="sidebar-collapse-toggle" title="Collapse" aria-label="Collapse sidebar" @click=${this.toggle}>
                <andy-icon name="chevronsLeft" size="sm"></andy-icon>
              </button>` : r}
        </andy-header>
        <nav class="sidebar-nav">${this.slotTarget()}</nav>
        ${this.hasSlot("footer") ? a`<andy-footer class="sidebar-footer">${this.slotTarget("footer")}</andy-footer>` : r}
      </aside>
    `;
  }
};
e([
  s({ type: Boolean, reflect: !0 })
], o.prototype, "collapsed", 2);
e([
  s({ type: Boolean })
], o.prototype, "collapsible", 2);
o = e([
  b("andy-sidebar")
], o);
m("andy-sidebar", o);
let i = class extends y {
  constructor() {
    super(...arguments), this.name = "", this.tagline = "", this.icon = "box";
  }
  render() {
    return a`
      <andy-icon-chip variant="solid" icon=${this.icon || r}>${this.slotTarget("logo")}</andy-icon-chip>
      <span class="sidebar-brand__text collapsed-hide">
        ${this.name ? a`<span class="sidebar-brand__name">${this.name}</span>` : r}
        ${this.tagline ? a`<span class="sidebar-brand__tagline">${this.tagline}</span>` : r}
      </span>
    `;
  }
};
e([
  s()
], i.prototype, "name", 2);
e([
  s()
], i.prototype, "tagline", 2);
e([
  s({ reflect: !0 })
], i.prototype, "icon", 2);
i = e([
  b("andy-sidebar-brand")
], i);
m("andy-sidebar-brand", i);
let n = class extends y {
  constructor() {
    super(...arguments), this.name = "", this.email = "", this.avatar = "";
  }
  render() {
    return a`
      <div class="sidebar-user">
        <andy-avatar>${this.avatar}</andy-avatar>
        <span class="sidebar-user__meta collapsed-hide">
          ${this.name ? a`<span class="sidebar-user__name">${this.name}</span>` : r}
          ${this.email ? a`<span class="sidebar-user__email">${this.email}</span>` : r}
        </span>
      </div>
    `;
  }
};
e([
  s()
], n.prototype, "name", 2);
e([
  s()
], n.prototype, "email", 2);
e([
  s()
], n.prototype, "avatar", 2);
n = e([
  b("andy-sidebar-user")
], n);
m("andy-sidebar-user", n);
export {
  o as AndySidebar,
  i as AndySidebarBrand,
  n as AndySidebarUser
};
//# sourceMappingURL=sidebar.js.map
