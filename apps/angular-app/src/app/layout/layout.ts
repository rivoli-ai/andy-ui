import { Component, inject, computed, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../identity-wrapper';
import { ThemeService } from '../theme-wrapper.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  readonly authService: AuthService = inject(AuthService);
  readonly themeService: ThemeService = inject(ThemeService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly userName = computed(() => {
    const profile = this.authService.profile();
    if (!profile) return '';
    return (profile['name'] as string | undefined) || (profile['sub'] as string | undefined) || '';
  });

  readonly isLoading = computed(() => this.authService.isLoading());
  readonly isAuthenticated = computed(() => this.authService.isAuthenticated());
  readonly isDark = computed(() => this.themeService.isDark());

  constructor() {
    effect(() => {
      this.authService.isLoading();
      this.authService.isAuthenticated();
      this.authService.profile();
      this.themeService.isDark();
      this.cdr.detectChanges();
    });
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
