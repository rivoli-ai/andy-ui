import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { OmnifexVariant } from '../shared/variant.enum';
import { OmnifexAppearance } from '../shared/appearance.enum';

@Component({
  tag: 'omnifex-button',
  styleUrl: 'button.css',
  shadow: true,
})
export class OmnifexButton {
  @Prop() variant: OmnifexVariant = OmnifexVariant.PRIMARY;
  @Prop() appearance: OmnifexAppearance = OmnifexAppearance.FILLED;
  @Prop() disabled: boolean = false;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  @Event({
    eventName: 'buttonClick',
    bubbles: true,
    composed: true,
  }) buttonClick!: EventEmitter<void>;

  private handleClick = () => {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  };

  private getButtonClasses(): string {
    const classes = ['btn'];
    
    // Add variant class
    classes.push(`btn-${this.variant}`);
    
    // Add appearance class
    classes.push(`btn-${this.appearance}`);
    
    return classes.join(' ');
  }

  render() {
    return (
      <button
        type={this.type}
        disabled={this.disabled}
        class={this.getButtonClasses()}
        onClick={this.handleClick}
      >
        <slot></slot>
      </button>
    );
  }
}
