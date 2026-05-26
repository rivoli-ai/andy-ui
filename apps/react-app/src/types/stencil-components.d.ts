/**
 * Type definitions for StencilJS web components used in React
 */
import React from 'react';
import { Variant } from './variant.enum';
import { Appearance } from './appearance.enum';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'omnifex-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        appearance?: Appearance;
        icon?: string;
        cardTitle?: string;
        description?: string;
        items?: string | string[];
        variant?: Variant;
        children?: React.ReactNode;
      };
      'omnifex-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: Variant;
        children?: React.ReactNode;
      };
      'andy-ui-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: Variant;
        appearance?: Appearance;
        size?: 'large' | 'medium' | 'small';
        disabled?: boolean;
        fullWidth?: boolean;
        type?: 'button' | 'submit' | 'reset';
        children?: React.ReactNode;
      };
      'andy-ui-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        /** Built-in icon name — renders from the Andy UI icon registry. */
        name?: string;
        /** Accessible name (aria-label). Defaults to `name` when name is provided. */
        label?: string;
        variant?: Variant;
        appearance?: Appearance;
        size?: 'large' | 'medium' | 'small';
        disabled?: boolean;
        type?: 'button' | 'submit' | 'reset';
        children?: React.ReactNode;
      };
      'omnifex-identity': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        isLoading?: boolean;
        isAuthenticated?: boolean;
        userName?: string;
      };
      'omnifex-theme-toggle': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        isDark?: boolean;
      };
      'omnifex-callback': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        isLoading?: boolean;
        error?: string | null;
        children?: React.ReactNode;
      };
      'omnifex-header': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        logoIcon?: string;
        logoText?: string;
        isLoading?: boolean;
        isAuthenticated?: boolean;
        userName?: string;
        isDark?: boolean;
        roles?: string | string[];
      };
      'omnifex-footer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        text?: string;
        framework?: string;
      };
    }
  }
}
