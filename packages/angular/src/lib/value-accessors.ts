import { Directive, ElementRef, HostListener, forwardRef, inject } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

/**
 * Form-control bridges so `ngModel` / reactive forms bind directly to the
 * Andy-UI web components. Consumers still need `CUSTOM_ELEMENTS_SCHEMA` in the
 * component/module that renders the `<andy-*>` tags.
 */

abstract class ValueAccessorBase<T> implements ControlValueAccessor {
  protected el = inject<ElementRef<HTMLElement & Record<string, unknown>>>(ElementRef);
  protected onChange: (v: T) => void = () => {};
  protected onTouched: () => void = () => {};

  abstract writeValue(value: T): void;
  registerOnChange(fn: (v: T) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    (this.el.nativeElement as Record<string, unknown>)["disabled"] = isDisabled;
  }
}

/** ngModel support for `<andy-input>` and `<andy-search-input>` (string value). */
@Directive({
  selector: "andy-input, andy-search-input",
  standalone: true,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AndyTextValueAccessor), multi: true },
  ],
})
export class AndyTextValueAccessor extends ValueAccessorBase<string> {
  writeValue(value: string): void {
    (this.el.nativeElement as Record<string, unknown>)["value"] = value ?? "";
  }
  @HostListener("andy-input", ["$event"])
  handleInput(e: CustomEvent<string>): void {
    this.onChange(e.detail);
  }
  @HostListener("blur")
  handleBlur(): void {
    this.onTouched();
  }
}

/** ngModel support for `<andy-select>` (string value). */
@Directive({
  selector: "andy-select",
  standalone: true,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AndySelectValueAccessor), multi: true },
  ],
})
export class AndySelectValueAccessor extends ValueAccessorBase<string> {
  writeValue(value: string): void {
    (this.el.nativeElement as Record<string, unknown>)["value"] = value ?? "";
  }
  @HostListener("andy-change", ["$event"])
  handleChange(e: CustomEvent<string>): void {
    this.onChange(e.detail);
    this.onTouched();
  }
}

/** ngModel support for `<andy-switch>` (boolean checked). */
@Directive({
  selector: "andy-switch",
  standalone: true,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AndySwitchValueAccessor), multi: true },
  ],
})
export class AndySwitchValueAccessor extends ValueAccessorBase<boolean> {
  writeValue(value: boolean): void {
    (this.el.nativeElement as Record<string, unknown>)["checked"] = !!value;
  }
  @HostListener("andy-change", ["$event"])
  handleChange(e: CustomEvent<boolean>): void {
    this.onChange(e.detail);
    this.onTouched();
  }
}

/** All value-accessor directives, handy for `imports: [...ANDY_FORM_ACCESSORS]`. */
export const ANDY_FORM_ACCESSORS = [
  AndyTextValueAccessor,
  AndySelectValueAccessor,
  AndySwitchValueAccessor,
] as const;
