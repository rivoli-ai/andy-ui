import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal, effect } from '@angular/core';
import { LocationService, LocationData } from './location.service';
import { AuthService } from '../identity-wrapper';
import { OmnifexVariant, OmnifexAppearance } from '@omnifex/ui-components';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './location.html',
  styleUrl: './location.scss',
})
export class LocationComponent {
  private readonly locationService = inject(LocationService);
  readonly authService = inject(AuthService);
  readonly Variant = OmnifexVariant;
  readonly Appearance = OmnifexAppearance;

  readonly location = signal<LocationData | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  private hasFetched = false;

  constructor() {
    // Fetch location when user becomes authenticated
    effect(() => {
      if (this.authService.isAuthenticated() && !this.hasFetched) {
        this.fetchLocation();
      }
      // Reset when user logs out
      if (!this.authService.isAuthenticated()) {
        this.hasFetched = false;
        this.location.set(null);
      }
    });
  }

  refresh(): void {
    this.fetchLocation();
  }

  private fetchLocation(): void {
    this.loading.set(true);
    this.error.set(null);
    this.hasFetched = true;

    this.locationService.getLocation().subscribe({
      next: (data) => {
        if (data.status === 'success') {
          this.location.set(data);
        } else {
          this.error.set('Could not determine location');
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Location error:', err);
        this.error.set('Failed to fetch location data');
        this.loading.set(false);
      },
    });
  }
}
