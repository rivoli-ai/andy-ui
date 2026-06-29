# @andy-ui/react

React bindings for the Andy-UI web components.

```bash
npm install @andy-ui/react @andy-ui/tokens
```

```tsx
import "@andy-ui/tokens/andy-ui.css"; // once, at the app root
import { Button, Input, toast } from "@andy-ui/react";

<Input label="Name" value={name} onAndyInput={(e) => setName(e.detail)} />
<Button variant="primary" onAndyClick={() => toast.success("Saved")}>Save</Button>
```

Custom events are surfaced as `on<Event>` props (`andy-click` → `onAndyClick`),
with the payload in `event.detail`.
