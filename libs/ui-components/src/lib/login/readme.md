# omnifex-login

Full-screen login layout (Figma: gradient `104:6030`, cards container `104:6051`): gradient background, brand title, and a primary card containing the login button.

## Usage

```html
<omnifex-login (login-click)="onLogin()"></omnifex-login>
```

```html
<omnifex-login
  heading="Andy UI"
  subheading="Design System"
  action-label="Login"
  error="Sign in failed."
></omnifex-login>
```

## Properties

| Property | Attribute | Default | Description |
|----------|-----------|---------|-------------|
| `heading` | `heading` | `Andy UI` | Primary title |
| `subheading` | `subheading` | `Design System` | Secondary title |
| `actionLabel` | `action-label` | `Login` | CTA button label |
| `isLoading` | `is-loading` | `false` | Disables CTA and shows loading label |
| `error` | `error` | — | Optional error message |
| `actionDisabled` | `action-disabled` | `false` | Disables CTA |

## Events

| Event | Description |
|-------|-------------|
| `login-click` | Emitted when the login button is activated |
