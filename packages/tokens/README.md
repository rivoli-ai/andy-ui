# @andy-ui/tokens

The Andy-UI stylesheet: design tokens (color, type, spacing, radius, motion,
z-index) plus all component styles. Pure CSS, framework-agnostic.

```bash
npm install @andy-ui/tokens
```

```ts
import "@andy-ui/tokens/andy-ui.css";        // everything
// or cherry-pick layers:
import "@andy-ui/tokens/tokens.css";          // just the design tokens
import "@andy-ui/tokens/base-components.css";
```

Theme switches via `data-theme="light" | "dark"` on `<html>`.
