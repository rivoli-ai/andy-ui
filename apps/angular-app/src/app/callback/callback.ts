import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, inject, ChangeDetectorRef, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../identity-wrapper';

@Component({
  selector: 'app-callback',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-theme-bg-secondary">
      <omnifex-callback
        [isLoading]="authService.isLoading()"
        [error]="authService.error()"
        (retry-click)="retry()"
      ></omnifex-callback>
    </div>
  `,
})
export class AppCallbackComponent implements OnInit {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      this.authService.isLoading();
      this.authService.error();
      this.cdr.detectChanges();
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      const returnUrl = await this.authService.handleCallback();
      this.router.navigateByUrl(returnUrl || '/');
    } catch (error) {
      console.error('Callback failed:', error);
    }
  }

  retry(): void {
    this.authService.login();
  }
}
