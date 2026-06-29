# @andy-ui/core

Framework-agnostic `<andy-*>` web components (built with Lit) for the Andy-UI
design system. Works in any framework or plain HTML.

```bash
npm install @andy-ui/core @andy-ui/tokens
```

```ts
import "@andy-ui/tokens/andy-ui.css"; // required, once
import "@andy-ui/core";               // registers every <andy-*> element
```

```html
<andy-button variant="primary">Save changes</andy-button>
```

Also exports imperative helpers: `toast`, `showToast`, `getTheme`, `setTheme`,
`toggleTheme`, `initTheme`.

For React use [`@andy-ui/react`](https://www.npmjs.com/package/@andy-ui/react);
for Angular use [`@andy-ui/angular`](https://www.npmjs.com/package/@andy-ui/angular).
