import { html as c, nothing as u } from "lit";
import { property as p, customElement as h } from "lit/decorators.js";
import { d as v, A as g } from "../chunks/base-DPbIYdLL.js";
var m = Object.defineProperty, y = Object.getOwnPropertyDescriptor, o = (t, s, r, l) => {
  for (var e = l > 1 ? void 0 : l ? y(s, r) : s, i = t.length - 1, d; i >= 0; i--)
    (d = t[i]) && (e = (l ? d(s, r, e) : d(e)) || e);
  return l && e && m(s, r, e), e;
};
let a = class extends g {
  constructor() {
    super(...arguments), this.collapsed = !1, this._onToggle = (t) => {
      this.collapsed = t.detail;
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("andy-collapse-toggle", this._onToggle);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("andy-collapse-toggle", this._onToggle);
  }
  render() {
    return c`
      ${this.slotTarget("sidebar")}
      <div class="app-col">
        ${this.slotTarget("header")}
        <div class="app-scroll">${this.slotTarget()}</div>
      </div>
    `;
  }
};
o([
  p({ type: Boolean, reflect: !0 })
], a.prototype, "collapsed", 2);
a = o([
  h("andy-app-shell")
], a);
v("andy-app-shell", a);
let n = class extends g {
  constructor() {
    super(...arguments), this.heading = "";
  }
  render() {
    return c`
      <div class="nav-section">
        ${this.heading ? c`<p class="nav-section-title collapsed-hide">${this.heading}</p>` : u}
        <div class="nav-list" role="list">${this.slotTarget()}</div>
      </div>
    `;
  }
};
o([
  p()
], n.prototype, "heading", 2);
n = o([
  h("andy-nav-section")
], n);
v("andy-nav-section", n);
export {
  a as AndyAppShell,
  n as AndyNavSection
};
//# sourceMappingURL=layout.js.map
