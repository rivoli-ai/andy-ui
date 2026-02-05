import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../identity-wrapper';
import { Variant } from '../types/variant.enum';
import { Appearance } from '../types/appearance.enum';
import './Location.css';

interface LocationData {
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

const Location: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  const fetchLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    setHasFetched(true);

    try {
      const response = await fetch('http://ip-api.com/json');
      const data: LocationData = await response.json();
      
      if (data.status === 'success') {
        setLocation(data);
      } else {
        setError('Could not determine location');
      }
    } catch (err) {
      console.error('Location error:', err);
      setError('Failed to fetch location data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && !hasFetched) {
      fetchLocation();
    }
    if (!isAuthenticated) {
      setHasFetched(false);
      setLocation(null);
    }
  }, [isAuthenticated, hasFetched, fetchLocation]);

  // Handle button click events from omnifex-button components
  useEffect(() => {
    const handleButtonClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('omnifex-button')) {
        fetchLocation();
      }
    };

    const cardEl = cardRef.current;
    if (cardEl) {
      cardEl.addEventListener('buttonClick', handleButtonClick, true);
      return () => {
        cardEl.removeEventListener('buttonClick', handleButtonClick, true);
      };
    }
  }, [fetchLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <omnifex-card
      ref={cardRef}
      appearance={Appearance.FILLED}
      variant={Variant.PRIMARY}
      icon="📍"
      cardTitle="Your Location"
      description=""
      items={JSON.stringify([])}
    >
      {loading && (
        <div className="location-loading">
          <span className="location-spinner"></span>
          <span>Detecting location...</span>
        </div>
      )}
      {error && (
        <div className="location-error">
          <p>{error}</p>
          <omnifex-button variant={Variant.PRIMARY} appearance={Appearance.OUTLINED}>
            Try Again
          </omnifex-button>
        </div>
      )}
      {location && !loading && !error && (
        <div className="location-info">
          <div className="location-main">
            <span className="location-city">{location.city}</span>
            <span className="location-region">
              {location.regionName}, {location.country}
            </span>
          </div>
          
          <div className="location-details">
            <div className="location-detail">
              <span className="location-label">IP Address</span>
              <span className="location-value">{location.query}</span>
            </div>
            <div className="location-detail">
              <span className="location-label">Coordinates</span>
              <span className="location-value">
                {location.lat}, {location.lon}
              </span>
            </div>
            <div className="location-detail">
              <span className="location-label">Timezone</span>
              <span className="location-value">{location.timezone}</span>
            </div>
            <div className="location-detail">
              <span className="location-label">ISP</span>
              <span className="location-value">{location.isp}</span>
            </div>
          </div>
          
          <omnifex-button variant={Variant.PRIMARY} appearance={Appearance.OUTLINED}>
            🔄 Refresh
          </omnifex-button>
        </div>
      )}
    </omnifex-card>
  );
};

export default Location;
