import { Component, Prop, Event, EventEmitter, h, Element } from '@stencil/core';
import { OmnifexVariant } from '../shared/variant.enum';

@Component({
  tag: 'omnifex-header',
  styleUrl: 'header.css',
  shadow: true,
})
export class OmnifexHeader {
  @Element() el!: HTMLElement;

  @Prop() logoIcon: string = '🅰️';
  @Prop() logoText: string = 'Omnifex';
  @Prop({ reflect: true }) isLoading: boolean = false;
  @Prop({ reflect: true }) isAuthenticated: boolean = false;
  @Prop({ reflect: true }) userName: string = '';
  @Prop({ reflect: true }) isDark: boolean = false;
  @Prop() roles: string | string[] = [];

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

  @Event({
    eventName: 'theme-toggle',
    bubbles: true,
    composed: true,
  }) themeToggle!: EventEmitter<void>;

  private themeToggleHandler?: () => void;
  private identityLoginHandler?: () => void;
  private identityLogoutHandler?: () => void;

  componentDidLoad() {
    this.setupEventListeners();
  }

  componentDidUpdate() {
    this.removeEventListeners();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  private setupEventListeners() {
    const shadowRoot = this.el.shadowRoot;
    if (!shadowRoot) return;

    // Setup theme toggle listener
    const themeToggle = shadowRoot.querySelector('omnifex-theme-toggle') as HTMLElement;
    if (themeToggle) {
      this.themeToggleHandler = () => {
        this.themeToggle.emit();
      };
      themeToggle.addEventListener('toggle-click', this.themeToggleHandler);
    }

    // Setup identity listeners
    const identity = shadowRoot.querySelector('omnifex-identity') as HTMLElement;
    if (identity) {
      this.identityLoginHandler = () => {
        this.loginClick.emit();
      };
      this.identityLogoutHandler = () => {
        this.logoutClick.emit();
      };
      identity.addEventListener('login-click', this.identityLoginHandler);
      identity.addEventListener('logout-click', this.identityLogoutHandler);
    }
  }

  private removeEventListeners() {
    const shadowRoot = this.el.shadowRoot;
    if (!shadowRoot) return;

    const themeToggle = shadowRoot.querySelector('omnifex-theme-toggle') as HTMLElement;
    if (themeToggle && this.themeToggleHandler) {
      themeToggle.removeEventListener('toggle-click', this.themeToggleHandler);
    }

    const identity = shadowRoot.querySelector('omnifex-identity') as HTMLElement;
    if (identity) {
      if (this.identityLoginHandler) {
        identity.removeEventListener('login-click', this.identityLoginHandler);
      }
      if (this.identityLogoutHandler) {
        identity.removeEventListener('logout-click', this.identityLogoutHandler);
      }
    }
  }

  private getRolesArray(): string[] {
    if (Array.isArray(this.roles)) {
      return this.roles;
    }
    if (typeof this.roles === 'string') {
      try {
        return JSON.parse(this.roles);
      } catch {
        return this.roles ? [this.roles] : [];
      }
    }
    return [];
  }

  private getBadgeVariant(role: string): OmnifexVariant {
    // Map roles to OmnifexVariant enum values
    if (role === 'admin') return OmnifexVariant.INVERSE;
    if (role === 'manager') return OmnifexVariant.SECONDARY;
    if (role === 'user') return OmnifexVariant.PRIMARY;
    return OmnifexVariant.TERTIARY;
  }

  render() {
    const rolesArray = this.getRolesArray();

    return (
      <header class="header">
        <div class="header-content">
          <div class="header-logo">
            <span class="logo-icon">{this.logoIcon}</span>
            <span class="logo-text">{this.logoText}</span>
          </div>
          <nav class="header-nav">
            {this.isAuthenticated && rolesArray.length > 0 && (
              <div class="roles-badge-container">
                {rolesArray.map((role) => (
                  <omnifex-badge variant={this.getBadgeVariant(role)}>
                    {role}
                  </omnifex-badge>
                ))}
              </div>
            )}
            <omnifex-theme-toggle
              isDark={this.isDark}
            />
            <omnifex-identity
              isLoading={this.isLoading}
              isAuthenticated={this.isAuthenticated}
              userName={this.userName}
            />
          </nav>
        </div>
      </header>
    );
  }
}
