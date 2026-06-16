import { html as l } from "lit";
import { customElement as o } from "lit/decorators.js";
import { d as h, A as c } from "../chunks/base-DPbIYdLL.js";
var v = Object.getOwnPropertyDescriptor, m = (a, s, i, d) => {
  for (var e = d > 1 ? void 0 : d ? v(s, i) : s, r = a.length - 1, n; r >= 0; r--)
    (n = a[r]) && (e = n(e) || e);
  return e;
};
let t = class extends c {
  render() {
    return l`
      <header class="header">
        <div class="header-content">
          <div class="header-title">${this.slotTarget()}</div>
          <div class="header-actions">${this.slotTarget("actions")}</div>
        </div>
      </header>
    `;
  }
};
t = m([
  o("andy-header")
], t);
h("andy-header", t);
export {
  t as AndyHeader
};
//# sourceMappingURL=header.js.map
