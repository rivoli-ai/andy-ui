import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, ChangeDetectorRef, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../identity-wrapper';

@Component({
  selector: 'app-login',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <omnifex-login
      [isLoading]="authService.isLoading()"
      [error]="authService.error()"
      (login-click)="login()"
    ></omnifex-login>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
    }
  `,
})
export class LoginComponent {
  readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      this.authService.isLoading();
      this.authService.error();
      this.authService.isAuthenticated();
      this.cdr.detectChanges();

      if (this.authService.isAuthenticated()) {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        void this.router.navigateByUrl(returnUrl);
      }
    });
  }

  login(): void {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    void this.authService.login(returnUrl);
  }
}
