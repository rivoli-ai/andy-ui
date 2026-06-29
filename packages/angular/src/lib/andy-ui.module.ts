import { NgModule } from "@angular/core";
import { ANDY_FORM_ACCESSORS } from "./value-accessors";

/**
 * Convenience module that wires up the Andy-UI form-control directives for
 * template-driven / reactive forms. Standalone consumers can instead import
 * the directives (or `ANDY_FORM_ACCESSORS`) directly.
 *
 * NOTE: components that render `<andy-*>` tags must add `CUSTOM_ELEMENTS_SCHEMA`
 * to their `schemas`, because the elements are custom elements, not Angular
 * components.
 */
@NgModule({
  imports: [...ANDY_FORM_ACCESSORS],
  exports: [...ANDY_FORM_ACCESSORS],
})
export class AndyUiModule {}
