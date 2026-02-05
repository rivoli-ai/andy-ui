# Using UI Components

This guide explains how to use the StencilJS-based UI components in your application. These components are framework-agnostic and work with Angular, React, Vue, vanilla JavaScript, and any other framework that supports web components.

## Setup

### 1. Import the Loader

The StencilJS loader must be imported to register the custom elements. Import it in your application's entry point:

**Angular** - In `main.ts`:
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

// Import StencilJS loader
import '@omnifex/ui-components/loader';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

**React** - In `index.tsx`:
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@omnifex/ui-components/loader';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Vue** - In `main.ts`:
```typescript
import { createApp } from 'vue';
import App from './App.vue';
import '@omnifex/ui-components/loader';

createApp(App).mount('#app');
```

**Vanilla JavaScript** - In your entry point:
```javascript
import '@omnifex/ui-components/loader';
// Your app code here
```

### 2. Framework-specific Configuration

#### Angular

In your Angular component where you want to use the web components, add `CUSTOM_ELEMENTS_SCHEMA`:

**For Standalone Components:**
```typescript
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <omnifex-button variant="primary">Click me</omnifex-button>
  `
})
export class ExampleComponent {}
```

**For NgModules:**
```typescript
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [YourComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YourModule {}
```

#### React

No special configuration needed. Use components directly in JSX:

```tsx
import React from 'react';

function ExampleComponent() {
  return (
    <omnifex-button variant="primary">
      Click me
    </omnifex-button>
  );
}

export default ExampleComponent;
```

#### Vue

Use components directly in templates:

```vue
<template>
  <omnifex-button variant="primary">Click me</omnifex-button>
</template>

<script setup lang="ts">
// No special setup needed
</script>
```

#### Vanilla JavaScript

Use components directly in HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="./main.js"></script>
</head>
<body>
  <omnifex-button variant="primary">Click me</omnifex-button>
</body>
</html>
```

### 3. Use Components in Templates/JSX/HTML

Now you can use the StencilJS components directly:

```html
<!-- Basic button -->
<omnifex-button>Click me</omnifex-button>

<!-- Button with variant -->
<omnifex-button variant="primary">Primary</omnifex-button>
<omnifex-button variant="secondary">Secondary</omnifex-button>
<omnifex-button variant="outline">Outline</omnifex-button>

<!-- Disabled button -->
<omnifex-button disabled>Disabled</omnifex-button>

<!-- Submit button -->
<omnifex-button type="submit" variant="primary">Submit</omnifex-button>
```

## Available Components

### OmnifexButton

A customizable button component with theme-aware styling.

**Properties:**
- `variant`: `'primary' | 'secondary' | 'outline'` (default: `'primary'`)
- `disabled`: `boolean` (default: `false`)
- `type`: `'button' | 'submit' | 'reset'` (default: `'button'`)

**Example:**
```html
<omnifex-button 
  variant="primary" 
  type="submit" 
  [disabled]="isLoading">
  {{ isLoading ? 'Loading...' : 'Submit' }}
</omnifex-button>
```

**React Example:**
```tsx
<omnifex-button 
  variant="primary" 
  type="submit" 
  disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</omnifex-button>
```

## Theme Integration

The components use CSS custom properties (CSS variables) for theming. They automatically pick up theme variables from your application:

- `--theme-accent-primary`: Primary accent color
- `--theme-accent-hover`: Hover state color
- `--theme-text-inverse`: Inverse text color
- `--theme-bg-secondary`: Secondary background
- `--theme-border-accent`: Accent border color

Make sure your theme CSS variables are defined in your global styles.

## Development

To develop new components:

1. Create a new component in `src/lib/your-component/`
2. Use the StencilJS `@Component` decorator
3. Build: `nx build ui-components`
4. The component will be available as a web component

## Building

```bash
# Build the library
nx build ui-components

# Watch mode (from library directory)
cd libs/ui-components
pnpm run start
```
