import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { OmnifexVariant } from '../shared/variant.enum';
import { OmnifexAppearance } from '../shared/appearance.enum';
import { OmnifexButtonSize } from '../shared/button-size.enum';
import { ICONS, IconName } from './icons';

/**
 * Icon-only action button (Figma: Icons / Icon component set, node 15:386).
 *
 * Two usage modes — they are mutually exclusive; `name` takes precedence:
 *
 * 1. **Named icon** (built-in registry):
 *    <andy-ui-icon name="settings"></andy-ui-icon>
 *
 * 2. **Custom SVG** (slot):
 *    <andy-ui-icon label="My icon">
 *      <svg ...><path .../></svg>
 *    </andy-ui-icon>
 *
 * Always provide an accessible name via `label`. When using `name`, the label
 * defaults to the icon name if `label` is omitted.
 */
@Component({
  tag: 'andy-ui-icon',
  styleUrl: 'icon.css',
  shadow: true,
})
export class AndyUiIcon {
  /** Color role: primary, secondary, tertiary */
  @Prop({ reflect: true }) variant: OmnifexVariant = OmnifexVariant.PRIMARY;

  /** Visual style: filled, outlined, basic (Figma: filled / outllined / standard) */
  @Prop({ reflect: true }) appearance: OmnifexAppearance = OmnifexAppearance.FILLED;

  @Prop({ reflect: true }) size: OmnifexButtonSize = OmnifexButtonSize.LARGE;

  @Prop({ reflect: true }) disabled = false;

  @Prop({ reflect: true }) type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Built-in icon name from the Andy UI icon registry.
   * When set, the named SVG is rendered and the default slot is ignored.
   * See `IconName` for the full list.
   */
  @Prop({ reflect: true }) name?: IconName;

  /**
   * Accessible name mapped to `aria-label`.
   * Optional when `name` is provided — defaults to the icon name in that case.
   * Required when using the slot (custom SVG) without `name`.
   */
  @Prop() label?: string;

  @Event({
    eventName: 'iconClick',
    bubbles: true,
    composed: true,
  })
  iconClick!: EventEmitter<void>;

  private handleClick = (): void => {
    if (!this.disabled) {
      this.iconClick.emit();
    }
  };

  private getButtonClasses(): string {
    return [
      'icon-btn',
      `icon-btn-${this.variant}`,
      `icon-btn-${this.appearance}`,
      `icon-btn-size-${this.size}`,
    ].join(' ');
  }

  private renderGlyph() {
    if (this.name) {
      const paths = ICONS[this.name];
      if (paths) {
        // innerHTML is valid on HTML elements in Stencil's JSX but not on SVGElement.
        // We wrap in a <span> that injects the full SVG markup.
        const svg =
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"` +
          ` fill="none" stroke="currentColor" stroke-width="2"` +
          ` stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
        return <span class="icon-btn__svg" innerHTML={svg} />;
      }
    }
    return <slot />;
  }

  render() {
    const effectiveLabel = this.label ?? this.name ?? '';

    return (
      <button
        part="button"
        type={this.type}
        disabled={this.disabled}
        class={this.getButtonClasses()}
        aria-label={effectiveLabel}
        aria-disabled={this.disabled ? 'true' : undefined}
        onClick={this.handleClick}
      >
        <span class="icon-btn__glyph" aria-hidden="true">
          {this.renderGlyph()}
        </span>
      </button>
    );
  }
}
