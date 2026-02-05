import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'omnifex-theme-toggle',
  styleUrl: 'theme-toggle.css',
  shadow: true,
})
export class OmnifexThemeToggle {
  @Prop({ reflect: true }) isDark: boolean = false;

  @Event({
    eventName: 'toggle-click',
    bubbles: true,
    composed: true,
  }) toggleClick!: EventEmitter<void>;

  private handleClick = () => {
    this.toggleClick.emit();
  };

  render() {
    return (
      <button
        onClick={this.handleClick}
        class="theme-toggle-button"
        aria-label="Toggle theme"
        type="button"
      >
        {this.isDark ? <span class="icon">☀️</span> : <span class="icon">🌙</span>}
      </button>
    );
  }
}
