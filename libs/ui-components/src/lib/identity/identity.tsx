import { Component, Prop, Event, EventEmitter, h, Element } from '@stencil/core';
import { OmnifexVariant } from '../shared/variant.enum';
import { OmnifexAppearance } from '../shared/appearance.enum';

@Component({
  tag: 'omnifex-identity',
  styleUrl: 'identity.css',
  shadow: true,
})
export class OmnifexIdentity {
  @Element() el!: HTMLElement;

  @Prop({ reflect: true }) isLoading: boolean = false;
  @Prop({ reflect: true }) isAuthenticated: boolean = false;
  @Prop({ reflect: true }) userName: string = '';

  @Event({
    eventName: 'login-click',
    bubbles: true,
    composed: true,
  }) loginClick!: EventEmitter<void>;

  @Event({
    eventName: 'logout-click',
    bubbles: true,
    composed: true,
  }) logoutClick!: EventEmitter<void>;

  private buttonClickHandler?: () => void;

  componentDidLoad() {
    this.setupButtonListeners();
  }

  componentDidUpdate() {
    this.removeButtonListeners();
    this.setupButtonListeners();
  }

  disconnectedCallback() {
    this.removeButtonListeners();
  }

  private setupButtonListeners() {
    const attemptSetup = (attempts = 0) => {
      if (attempts > 10) {
        console.warn('omnifex-identity: Failed to find omnifex-button after 10 attempts');
        return;
      }

      const shadowRoot = this.el.shadowRoot;
      if (!shadowRoot) {
        setTimeout(() => attemptSetup(attempts + 1), 10);
        return;
      }

      const button = shadowRoot.querySelector('omnifex-button') as HTMLElement;
      if (!button) {
        setTimeout(() => attemptSetup(attempts + 1), 10);
        return;
      }

      if (this.buttonClickHandler) {
        button.removeEventListener('buttonClick', this.buttonClickHandler);
      }

      this.buttonClickHandler = () => {
        if (!this.isAuthenticated) {
          this.loginClick.emit();
        } else {
          this.logoutClick.emit();
        }
      };
      button.addEventListener('buttonClick', this.buttonClickHandler);
    };

    requestAnimationFrame(() => attemptSetup());
  }

  private removeButtonListeners() {
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
        <div class="identity-container">
          <div class="loading">Loading...</div>
        </div>
      );
    }

    if (this.isAuthenticated) {
      return (
        <div class="identity-container">
          <div class="user-info">
            <span class="user-name">{this.userName || 'User'}</span>
            <omnifex-button variant={OmnifexVariant.PRIMARY} appearance={OmnifexAppearance.OUTLINED} id="logout-button">
              Logout
            </omnifex-button>
          </div>
        </div>
      );
    }

    return (
      <div class="identity-container">
        <omnifex-button variant={OmnifexVariant.PRIMARY} id="login-button">
          Login
        </omnifex-button>
      </div>
    );
  }
}
