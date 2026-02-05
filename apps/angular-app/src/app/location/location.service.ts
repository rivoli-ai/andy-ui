import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LocationData {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string; // IP address
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://ip-api.com/json';

  /**
   * Gets location data based on the user's IP address.
   * Uses the free ip-api.com service.
   */
  getLocation(): Observable<LocationData> {
    return this.http.get<LocationData>(this.apiUrl);
  }
}
