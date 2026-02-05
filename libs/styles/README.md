# Styles Library

A comprehensive styling library for Angular applications with Tailwind CSS 4, including theme management and design system utilities.

## Features

- 🎨 **Theme System**: Light and dark theme support with CSS custom properties
- 🌓 **Theme Toggle**: Built-in theme switching component
- 🎯 **Design Tokens**: Consistent color palette and design system
- ⚡ **Tailwind CSS 4**: Latest version with PostCSS integration

## Installation

The styles library is part of this monorepo. Import it in your Angular application:

```typescript
import { ThemeService } from '@omnifex/styles';
```

## Theme System

### Theme Colors

The library provides a comprehensive theme system with CSS custom properties that automatically switch between light and dark modes.

#### Available Theme Colors

**Background Colors:**
- `theme-bg-primary` - Primary background
- `theme-bg-secondary` - Secondary background
- `theme-bg-tertiary` - Tertiary background
- `theme-bg-inverse` - Inverse background

**Text Colors:**
- `theme-text-primary` - Primary text
- `theme-text-secondary` - Secondary text
- `theme-text-tertiary` - Tertiary text
- `theme-text-inverse` - Inverse text
- `theme-text-muted` - Muted text

**Border Colors:**
- `theme-border-primary` - Primary border
- `theme-border-secondary` - Secondary border
- `theme-border-accent` - Accent border

**Accent Colors:**
- `theme-accent-primary` - Primary accent
- `theme-accent-secondary` - Secondary accent
- `theme-accent-hover` - Hover state accent
- `theme-accent-light` - Light accent variant

**Status Colors:**
- `theme-status-success` - Success state
- `theme-status-warning` - Warning state
- `theme-status-error` - Error state
- `theme-status-info` - Info state

**Surface Colors:**
- `theme-surface-primary` - Primary surface (cards, modals)
- `theme-surface-secondary` - Secondary surface
- `theme-surface-elevated` - Elevated surface
- `theme-surface-hover` - Hover state surface

### Using Theme Colors in Tailwind

You can use theme colors in your templates with Tailwind utility classes:

```html
<!-- Background colors -->
<div class="bg-theme-bg-primary">
<div class="bg-theme-bg-secondary">

<!-- Text colors -->
<p class="text-theme-text-primary">
<span class="text-theme-text-secondary">

<!-- Border colors -->
<div class="border-theme-border-primary">

<!-- Accent colors -->
<button class="bg-theme-accent-primary hover:bg-theme-accent-hover">

<!-- Status colors -->
<div class="text-theme-status-success">
<div class="bg-theme-status-error">

<!-- Surface colors -->
<div class="bg-theme-surface-primary">
```

### Using Theme Colors in CSS/SCSS

You can also use CSS custom properties directly:

```css
.my-component {
  background-color: var(--theme-bg-primary);
  color: var(--theme-text-primary);
  border: 1px solid var(--theme-border-primary);
}
```

## Theme Service

The `ThemeService` manages theme state and provides methods to control the theme.

### Basic Usage

```typescript
import { Component, inject } from '@angular/core';
import { ThemeService, Theme } from '@omnifex/styles';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="themeService.toggleTheme()">
      Toggle Theme
    </button>
    <p>Current theme: {{ themeService.theme() }}</p>
  `
})
export class AppComponent {
  protected readonly themeService = inject(ThemeService);
}
```

### API

#### Properties

- `theme: Signal<Theme>` - Read-only signal of the current theme (`'light' | 'dark' | 'system'`)
- `isDark: Signal<boolean>` - Read-only signal indicating if dark mode is active

#### Methods

- `setTheme(theme: Theme): void` - Set a specific theme
- `toggleTheme(): void` - Toggle between light and dark themes

### Example: Setting Theme Programmatically

```typescript
export class MyComponent {
  private themeService = inject(ThemeService);

  enableDarkMode() {
    this.themeService.setTheme('dark');
  }

  enableLightMode() {
    this.themeService.setTheme('light');
  }

  useSystemTheme() {
    this.themeService.setTheme('system');
  }
}
```

## Theme Toggle Component

A ready-to-use StencilJS web component for toggling themes is available in `@omnifex/ui-components`:

```html
<omnifex-theme-toggle
  [isDark]="themeService.isDark()"
  (toggle-click)="themeService.toggleTheme()"
></omnifex-theme-toggle>
```

The component automatically displays an appropriate icon based on the current theme state.

## Theme Configuration

### Default Theme

The default theme colors are defined in `theme.css`. This file is the **single source of truth** for all theme colors.

The CSS file uses CSS custom properties (variables) that automatically switch between light and dark themes:

```css
:root {
  /* Light theme colors */
  --theme-bg-primary: #ffffff;
  --theme-text-primary: #0f172a;
  /* ... */
}

.dark {
  /* Dark theme colors */
  --theme-bg-primary: #0f172a;
  --theme-text-primary: #f1f5f9;
  /* ... */
}
```

### Overriding Theme Colors

You can override theme colors from your main application without modifying the library. There are two approaches:

#### Option 1: Override in `styles.scss` (Recommended)

Add your overrides in `src/styles.scss` **after** importing `theme.css`:

```scss
// Import Theme CSS Variables
@import '../projects/styles/src/lib/theme.css';

// Override theme colors
:root {
  --theme-accent-primary: #3b82f6;  // Change to blue
  --theme-bg-primary: #f9fafb;       // Lighter background
}

.dark {
  --theme-accent-primary: #818cf8;   // Different blue for dark mode
  --theme-bg-primary: #0a0e1a;       // Darker background
}

// Import Tailwind CSS
@import './tailwind.css';
```

#### Option 2: Separate Override File

Create a separate file `src/theme-overrides.scss`:

```scss
// src/theme-overrides.scss
:root {
  --theme-accent-primary: #3b82f6;
  --theme-bg-primary: #f9fafb;
}

.dark {
  --theme-accent-primary: #818cf8;
  --theme-bg-primary: #0a0e1a;
}
```

Then import it in `src/styles.scss`:

```scss
@import '../projects/styles/src/lib/theme.css';
@import './theme-overrides.scss';  // Your overrides
@import './tailwind.css';
```

#### Available CSS Variables

You can override any of these variables:

**Background Colors:**
- `--theme-bg-primary`, `--theme-bg-secondary`, `--theme-bg-tertiary`, `--theme-bg-inverse`

**Text Colors:**
- `--theme-text-primary`, `--theme-text-secondary`, `--theme-text-tertiary`, `--theme-text-inverse`, `--theme-text-muted`

**Border Colors:**
- `--theme-border-primary`, `--theme-border-secondary`, `--theme-border-accent`

**Accent Colors:**
- `--theme-accent-primary`, `--theme-accent-secondary`, `--theme-accent-hover`, `--theme-accent-light`

**Status Colors:**
- `--theme-status-success`, `--theme-status-warning`, `--theme-status-error`, `--theme-status-info`

**Surface Colors:**
- `--theme-surface-primary`, `--theme-surface-secondary`, `--theme-surface-elevated`, `--theme-surface-hover`

> **Note:** CSS variables cascade, so any overrides you define will take precedence over the default values in `theme.css`.

## Best Practices

1. **Use Theme Colors**: Always use theme colors instead of hardcoded colors for better theme support
2. **Smooth Transitions**: Add `transition-colors` class for smooth theme transitions
3. **Test Both Themes**: Ensure your components work well in both light and dark modes
4. **Accessibility**: Maintain sufficient contrast ratios in both themes

## Examples

### Card Component with Theme

```html
<div class="bg-theme-surface-primary border-theme-border-primary rounded-lg p-6 transition-colors">
  <h2 class="text-theme-text-primary text-xl font-bold mb-2">Card Title</h2>
  <p class="text-theme-text-secondary">Card content goes here</p>
</div>
```

### Button with Theme Colors

```html
<button class="bg-theme-accent-primary hover:bg-theme-accent-hover text-theme-text-inverse px-4 py-2 rounded transition-colors">
  Click Me
</button>
```

### Status Badge

```html
<span class="bg-theme-status-success text-white px-2 py-1 rounded text-sm">
  Success
</span>
```

## Integration

Make sure to:

1. Import the theme CSS in your main stylesheet:
   ```scss
   @import '../projects/styles/src/lib/theme.css';
   ```

2. Initialize the ThemeService in your root component:
   ```typescript
   export class AppComponent {
     private readonly themeService = inject(ThemeService);
   }
   ```

3. Use the theme toggle component or theme service in your application.

## Development

### Building the Library

```bash
ng build styles
```

### Testing

```bash
ng test styles
```
