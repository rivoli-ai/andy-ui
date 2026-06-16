import { nothing as p, html as d } from "lit";
import { property as l, customElement as h } from "lit/decorators.js";
import { d as m, A as _ } from "../chunks/base-DPbIYdLL.js";
import "./icon-chip.js";
var b = Object.defineProperty, f = Object.getOwnPropertyDescriptor, a = (c, n, s, r) => {
  for (var e = r > 1 ? void 0 : r ? f(n, s) : n, i = c.length - 1, o; i >= 0; i--)
    (o = c[i]) && (e = (r ? o(n, s, e) : o(e)) || e);
  return r && e && b(n, s, e), e;
};
let t = class extends _ {
  constructor() {
    super(...arguments), this.name = "", this.tagline = "", this.icon = "box";
  }
  render() {
    return d`
      <div class="sidebar-brand">
        <andy-icon-chip variant="solid" icon=${this.icon || p}>${this.slotTarget("logo")}</andy-icon-chip>
        <span class="sidebar-brand__text collapsed-hide">
          ${this.name ? d`<span class="sidebar-brand__name">${this.name}</span>` : p}
          ${this.tagline ? d`<span class="sidebar-brand__tagline">${this.tagline}</span>` : p}
        </span>
      </div>
    `;
  }
};
a([
  l()
], t.prototype, "name", 2);
a([
  l()
], t.prototype, "tagline", 2);
a([
  l({ reflect: !0 })
], t.prototype, "icon", 2);
t = a([
  h("andy-header")
], t);
m("andy-header", t);
export {
  t as AndyHeader
};
//# sourceMappingURL=header.js.map
