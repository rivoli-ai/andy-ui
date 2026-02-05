import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
  effect,
} from '@angular/core';
import { AuthService } from './auth.service.js';

/**
 * Structural directive that conditionally shows content based on user roles.
 *
 * @example
 * ```html
 * <!-- Show only for admins -->
 * <div *hasRole="'admin'">Admin content</div>
 *
 * <!-- Show for multiple roles (any) -->
 * <div *hasRole="['admin', 'manager']">Admin or Manager content</div>
 *
 * <!-- Show for multiple roles (all required) -->
 * <div *hasRole="['admin', 'manager']; requireAll: true">Must have both roles</div>
 * ```
 */
@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly authService = inject(AuthService);

  private roles: string[] = [];
  private requireAll = false;
  private isVisible = false;

  @Input()
  set hasRole(value: string | string[]) {
    this.roles = Array.isArray(value) ? value : [value];
    this.updateView();
  }

  @Input()
  set hasRoleRequireAll(value: boolean) {
    this.requireAll = value;
    this.updateView();
  }

  constructor() {
    // React to authentication changes
    effect(() => {
      // Access the signal to create a dependency
      this.authService.roles();
      this.updateView();
    });
  }

  private updateView(): void {
    const hasAccess = this.checkAccess();

    if (hasAccess && !this.isVisible) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isVisible = true;
    } else if (!hasAccess && this.isVisible) {
      this.viewContainer.clear();
      this.isVisible = false;
    }
  }

  private checkAccess(): boolean {
    if (!this.authService.isAuthenticated()) {
      return false;
    }

    if (this.roles.length === 0) {
      return true;
    }

    if (this.requireAll) {
      return this.authService.hasAllRoles(...this.roles);
    }

    return this.authService.hasAnyRole(...this.roles);
  }
}



