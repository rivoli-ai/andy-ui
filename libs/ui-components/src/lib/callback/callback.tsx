import { Component, Prop, Event, EventEmitter, h, Element } from '@stencil/core';
import { OmnifexVariant } from '../shared/variant.enum';
import { OmnifexAppearance } from '../shared/appearance.enum';

@Component({
  tag: 'omnifex-callback',
  styleUrl: 'callback.css',
  shadow: true,
})
export class OmnifexCallback {
  @Element() el!: HTMLElement;

  @Prop() isLoading: boolean = false;
  @Prop() error: string | null = null;

  @Event({
    eventName: 'retry-click',
    bubbles: true,
    composed: true,
  }) retryClick!: EventEmitter<void>;

  private buttonClickHandler?: () => void;

  componentDidLoad() {
    if (this.error) {
      this.setupButtonListener();
    }
  }

  componentDidUpdate() {
    this.removeButtonListener();
    if (this.error) {
      this.setupButtonListener();
    }
  }

  disconnectedCallback() {
    this.removeButtonListener();
  }

  private setupButtonListener() {
    if (!this.error) {
      return;
    }

    const attemptSetup = (attempts = 0) => {
      if (attempts > 20) {
        console.warn('omnifex-callback: Failed to find omnifex-button after 20 attempts');
        return;
      }

      const shadowRoot = this.el.shadowRoot;
      if (!shadowRoot) {
        setTimeout(() => attemptSetup(attempts + 1), 20);
        return;
      }

      const button = shadowRoot.querySelector('omnifex-button') as HTMLElement;
      if (!button) {
        setTimeout(() => attemptSetup(attempts + 1), 20);
        return;
      }

      if (this.buttonClickHandler) {
        button.removeEventListener('buttonClick', this.buttonClickHandler);
      }

      this.buttonClickHandler = () => {
        this.retryClick.emit();
      };
      button.addEventListener('buttonClick', this.buttonClickHandler);
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => attemptSetup());
    });
  }

  private removeButtonListener() {
    if (this.buttonClickHandler) {
      const shadowRoot = this.el.shadowRoot;
      if (shadowRoot) {
        const button = shadowRoot.querySelector('omnifex-button') as HTMLElement;
        if (button) {
          button.removeEventListener('buttonClick', this.buttonClickHandler);
        }
      }
      this.buttonClickHandler = undefined;
    }
  }

  render() {
    if (this.isLoading) {
      return (
        <div class="callback-container">
          <div class="loading">
            <p>Completing sign in...</p>
          </div>
        </div>
      );
    }

    if (this.error) {
      return (
        <div class="callback-container">
          <div class="error">
            <p>{this.error}</p>
            <omnifex-button variant={OmnifexVariant.PRIMARY} appearance={OmnifexAppearance.OUTLINED}>
              Try Again
            </omnifex-button>
          </div>
        </div>
      );
    }

    return null;
  }
}
