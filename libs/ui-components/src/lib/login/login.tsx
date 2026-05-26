import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { OmnifexVariant } from '../shared/variant.enum';
import { OmnifexAppearance } from '../shared/appearance.enum';
import { OmnifexButtonSize } from '../shared/button-size.enum';

/**
 * Login layout page (Figma: gradient `104:6030`, cards container `104:6051`).
 */
@Component({
  tag: 'omnifex-login',
  styleUrl: 'login.css',
  shadow: true,
})
export class OmnifexLogin {
  @Prop() heading: string = 'Andy UI';

  @Prop() subheading: string = 'Design System';

  @Prop() cardTitle: string = 'Welcome Back';

  @Prop() cardDescription: string = 'Sign in to access your application again.';

  @Prop({ reflect: true }) isLoading: boolean = false;

  @Prop({ reflect: true }) error: string | null = null;

  @Prop() actionLabel: string = 'Login';

  @Prop({ reflect: true }) actionDisabled: boolean = false;

  @Event({
    eventName: 'login-click',
    bubbles: true,
    composed: true,
  })
  loginClick!: EventEmitter<void>;

  private handleCta = (): void => {
    if (!this.isLoading && !this.actionDisabled) {
      this.loginClick.emit();
    }
  };

  render() {
    return (
      <main class="login" part="layout" aria-busy={this.isLoading ? 'true' : undefined}>
        <div class="login__content" part="content">
          <h1 class="login__title">{this.heading}</h1>
          <p class="login__subtitle">{this.subheading}</p>

          <div class="login__card" part="card">
            <h2 class="login__card-title">{this.cardTitle}</h2>
            <p class="login__card-description">{this.cardDescription}</p>

            {this.error && (
              <div class="login__error" role="alert">
                {this.error}
              </div>
            )}

            <andy-ui-button
              variant={OmnifexVariant.PRIMARY}
              appearance={OmnifexAppearance.FILLED}
              size={OmnifexButtonSize.LARGE}
              disabled={this.isLoading || this.actionDisabled}
              full-width
              onButtonClick={this.handleCta}
            >
              {this.isLoading ? 'Loading…' : this.actionLabel}
            </andy-ui-button>
          </div>
        </div>
      </main>
    );
  }
}
