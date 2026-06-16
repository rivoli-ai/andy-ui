import { nothing as f, html as i } from "lit";
import { customElement as d } from "lit/decorators.js";
import { d as m, A as c } from "../chunks/base-DPbIYdLL.js";
var v = Object.getOwnPropertyDescriptor, _ = (r, s, l, a) => {
  for (var t = a > 1 ? void 0 : a ? v(s, l) : s, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (t = n(t) || t);
  return t;
};
let e = class extends c {
  render() {
    return i`
      <footer class="au-footer">
        <div class="au-footer__main">${this.slotTarget()}</div>
        ${this.hasSlot("actions") ? i`<div class="au-footer__actions">${this.slotTarget("actions")}</div>` : f}
      </footer>
    `;
  }
};
e = _([
  d("andy-footer")
], e);
m("andy-footer", e);
export {
  e as AndyFooter
};
//# sourceMappingURL=footer.js.map
