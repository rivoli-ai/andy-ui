import { Component, Prop, Event, EventEmitter, h, State } from '@stencil/core';
import { OmnifexVariant } from '../shared/variant.enum';
import { OmnifexAppearance } from '../shared/appearance.enum';
import { OmnifexButtonSize } from '../shared/button-size.enum';

@Component({
  tag: 'andy-ui-button',
  styleUrl: 'button.css',
  shadow: true,
})
export class AndyUiButton {
  /** Color appearance: primary, secondary, tertiary (Figma Apperance) */
  @Prop({ reflect: true }) variant: OmnifexVariant = OmnifexVariant.PRIMARY;

  /** Visual style: filled, outlined, basic/ghost (Figma variant) */
  @Prop({ reflect: true }) appearance: OmnifexAppearance = OmnifexAppearance.FILLED;

  /** Figma scale only: large, medium, small (no flex). */
  @Prop({ reflect: true }) size: OmnifexButtonSize = OmnifexButtonSize.LARGE;

  private normalizedSize(): OmnifexButtonSize {
    const valid = Object.values(OmnifexButtonSize) as string[];
    return valid.includes(this.size) ? this.size : OmnifexButtonSize.LARGE;
  }

  @Prop({ reflect: true }) disabled = false;

  @Prop({ reflect: true }) fullWidth = false;

  @Prop({ reflect: true }) type: 'button' | 'submit' | 'reset' = 'button';

  @State() private hasIcon = false;

  private handleIconSlotChange = (event: Event): void => {
    const slot = event.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    this.hasIcon = nodes.some(
      (node) =>
        node.nodeType !== Node.TEXT_NODE ||
        (node.textContent?.trim().length ?? 0) > 0
    );
  };

  @Event({
    eventName: 'buttonClick',
    bubbles: true,
    composed: true,
  })
  buttonClick!: EventEmitter<void>;

  private handleClick = (): void => {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  };

  private getButtonClasses(): string {
    const classes = [
      'btn',
      `btn-${this.variant}`,
      `btn-${this.appearance}`,
      `btn-size-${this.normalizedSize()}`,
    ];

    if (this.fullWidth) {
      classes.push('btn--full-width');
    }

    return classes.join(' ');
  }

  render() {
    return (
      <button
        part="button"
        type={this.type}
        disabled={this.disabled}
        class={this.getButtonClasses()}
        onClick={this.handleClick}
        aria-disabled={this.disabled ? 'true' : undefined}
      >
        <span
          class={{ 'btn__icon': true, 'btn__icon--hidden': !this.hasIcon }}
          aria-hidden="true"
        >
          <slot name="icon" onSlotchange={this.handleIconSlotChange} />
        </span>
        <span class="btn__label">
          <slot />
        </span>
      </button>
    );
  }
}
