# UI Components Library

This library contains UI components built with StencilJS that are framework-agnostic and can be used in any framework (Angular, React, Vue, vanilla JavaScript, etc.).

## Installation

The library is part of the monorepo and can be built using:

```bash
nx build ui-components
# or
pnpm nx build ui-components
```

## Usage

### 1. Import the loader

The StencilJS loader must be imported to register the custom elements. The import location depends on your framework:

**Angular** - In `main.ts` or `app.config.ts`:
```typescript
import '@omnifex/ui-components/loader';
```

**React** - In `index.tsx` or `App.tsx`:
```typescript
import '@omnifex/ui-components/loader';
```

**Vue** - In `main.ts`:
```typescript
import '@omnifex/ui-components/loader';
```

**Vanilla JavaScript** - In your entry point:
```javascript
import '@omnifex/ui-components/loader';
```

**Note:** The ui-components library uses CSS custom properties from the `styles` library. Make sure your application imports the theme CSS variables (typically done in your global styles file).

### 2. Framework-specific setup

#### Angular

In your Angular component or module, add `CUSTOM_ELEMENTS_SCHEMA`:

```typescript
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  // ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

#### React

No special configuration needed. Use components directly in JSX:

```tsx
function MyComponent() {
  return <omnifex-button variant="primary">Click me</omnifex-button>;
}
```

#### Vue

Use components directly in templates:

```vue
<template>
  <omnifex-button variant="primary">Click me</omnifex-button>
</template>
```

#### Vanilla JavaScript

Use components directly in HTML:

```html
<omnifex-button variant="primary">Click me</omnifex-button>
```

### 3. Use components

```html
<omnifex-button variant="primary">Click me</omnifex-button>
<omnifex-button variant="secondary" disabled>Disabled</omnifex-button>
<omnifex-button variant="outline">Outline</omnifex-button>
```

## Available Components

### OmnifexButton

A customizable button component with multiple variants.

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' (default: 'primary')
- `disabled`: boolean (default: false)
- `type`: 'button' | 'submit' | 'reset' (default: 'button')

**Example:**
```html
<omnifex-button variant="primary" type="submit">Submit</omnifex-button>
```

## Development

To develop new components:

1. Create a new component in `src/lib/`
2. Use the StencilJS component decorator
3. Build the library: `nx build ui-components`
4. The components will be available as web components

## Building

```bash
# Build StencilJS components
nx build ui-components

# Watch mode for development (from library directory)
cd libs/ui-components
pnpm run start
```
