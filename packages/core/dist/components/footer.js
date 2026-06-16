import { nothing as d, html as p } from "lit";
import { property as m, customElement as v } from "lit/decorators.js";
import { d as h, A as _ } from "../chunks/base-DPbIYdLL.js";
import "./avatar.js";
var c = Object.defineProperty, f = Object.getOwnPropertyDescriptor, t = (l, r, n, s) => {
  for (var a = s > 1 ? void 0 : s ? f(r, n) : r, o = l.length - 1, i; o >= 0; o--)
    (i = l[o]) && (a = (s ? i(r, n, a) : i(a)) || a);
  return s && a && c(r, n, a), a;
};
let e = class extends _ {
  constructor() {
    super(...arguments), this.name = "", this.email = "", this.avatar = "";
  }
  render() {
    return p`
      <div class="sidebar-user">
        <andy-avatar>${this.avatar}${this.slotTarget("avatar")}</andy-avatar>
        <span class="sidebar-user__meta collapsed-hide">
          ${this.name ? p`<span class="sidebar-user__name">${this.name}</span>` : d}
          ${this.email ? p`<span class="sidebar-user__email">${this.email}</span>` : d}
        </span>
      </div>
    `;
  }
};
t([
  m()
], e.prototype, "name", 2);
t([
  m()
], e.prototype, "email", 2);
t([
  m()
], e.prototype, "avatar", 2);
e = t([
  v("andy-footer")
], e);
h("andy-footer", e);
export {
  e as AndyFooter
};
//# sourceMappingURL=footer.js.map
