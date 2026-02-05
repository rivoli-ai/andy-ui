import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocationComponent } from '../location/location.component';
import { HasRoleDirective } from '../identity-wrapper';
import { OmnifexVariant, OmnifexAppearance } from '@omnifex/ui-components';

@Component({
  selector: 'app-dashboard',
  imports: [LocationComponent, HasRoleDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  readonly Variant = OmnifexVariant;
  readonly Appearance = OmnifexAppearance;
}
