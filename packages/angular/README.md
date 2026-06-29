# @andy-ui/angular

Angular bindings for the Andy-UI web components: `ngModel`/reactive-form
directives for the form controls, a `ToastService`, and element registration.

```bash
npm install @andy-ui/angular @andy-ui/tokens
```

```ts
import "@andy-ui/tokens/andy-ui.css";
import "@andy-ui/angular"; // registers <andy-*> elements
```

```ts
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AndyUiModule } from "@andy-ui/angular";

@Component({
  standalone: true,
  imports: [FormsModule, AndyUiModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // required for custom elements
  template: `<andy-input label="Name" [(ngModel)]="name"></andy-input>`,
})
export class Demo { name = ""; }
```
