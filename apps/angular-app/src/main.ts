import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Import and register StencilJS components
// @ts-ignore - StencilJS loader types may not be available
import { defineCustomElements } from '@omnifex/ui-components/loader';

// Register custom elements before bootstrapping Angular
defineCustomElements(window);

bootstrapApplication(App, appConfig)
  .catch((err: unknown) => console.error(err));
