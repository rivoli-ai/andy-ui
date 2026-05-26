import React from 'react';
import { useAuth } from '../identity-wrapper';
import Location from './Location';
import { Variant } from '../types/variant.enum';
import { Appearance } from '../types/appearance.enum';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { isAuthenticated, roles } = useAuth();

  const hasRole = (role: string) => {
    return roles.includes(role);
  };

  const hasAnyRole = (roleList: string[]) => {
    return roleList.some(role => roles.includes(role));
  };

  return (
    <main className="dashboard-main">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Welcome to <span className="dashboard-title-gradient">Omnifex</span>
        </h1>
        <p className="dashboard-subtitle">
          Your modern React application with secure authentication
        </p>
        <div className="dashboard-buttons">
          <andy-ui-button variant={Variant.PRIMARY}>
            <andy-ui-icon slot="icon" name="home" size="flex" />
            Home
          </andy-ui-button>
          <andy-ui-button variant={Variant.SECONDARY}>
            <andy-ui-icon slot="icon" name="search" size="flex" />
            Search
          </andy-ui-button>
          <andy-ui-button variant={Variant.PRIMARY} appearance={Appearance.OUTLINED}>
            <andy-ui-icon slot="icon" name="settings" size="flex" />
            Settings
          </andy-ui-button>
          <andy-ui-button variant={Variant.TERTIARY}>
            <andy-ui-icon slot="icon" size="flex" aria-label="Favorite">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </andy-ui-icon>
            Favorite
          </andy-ui-button>
        </div>
        <section className="icon-showcase" aria-label="Icon examples">
          <p className="icon-showcase__heading">Icons</p>
          <div className="icon-showcase__grid">
            <div className="icon-showcase__item">
              <andy-ui-icon name="home" size="large" aria-label="home" />
              <span className="icon-showcase__label">home · large</span>
            </div>
            <div className="icon-showcase__item">
              <andy-ui-icon name="search" size="medium" aria-label="search" />
              <span className="icon-showcase__label">search · medium</span>
            </div>
            <div className="icon-showcase__item">
              <andy-ui-icon name="settings" size="small" aria-label="settings" />
              <span className="icon-showcase__label">settings · small</span>
            </div>
            <div className="icon-showcase__item icon-showcase__item--flex">
              <andy-ui-icon name="edit" aria-label="edit" />
              <span className="icon-showcase__label">edit · flex</span>
            </div>
            <div className="icon-showcase__item">
              <andy-ui-icon size="large" aria-label="Favorite">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </andy-ui-icon>
              <span className="icon-showcase__label">favorite · custom slot</span>
            </div>
          </div>
        </section>
        <div className="dashboard-badges">
          <omnifex-badge variant={Variant.PRIMARY}>Primary</omnifex-badge>
          <omnifex-badge variant={Variant.SECONDARY}>Secondary</omnifex-badge>
          <omnifex-badge variant={Variant.TERTIARY}>Tertiary</omnifex-badge>
          <omnifex-badge variant={Variant.INVERSE}>Inverse</omnifex-badge>
        </div>
      </div>

      <div className="dashboard-cards">
        <Location />

        {isAuthenticated && hasRole('admin') && (
          <omnifex-card
            appearance={Appearance.OUTLINED}
            variant={Variant.PRIMARY}
            icon="👑"
            cardTitle="Admin Panel"
            description="This content is only visible to administrators."
            items={JSON.stringify(['User management', 'System configuration', 'Audit logs', 'Full access control'])}
          />
        )}

        {isAuthenticated && hasRole('manager') && (
          <omnifex-card
            appearance={Appearance.OUTLINED}
            variant={Variant.SECONDARY}
            icon="📊"
            cardTitle="Manager Dashboard"
            description="This content is only visible to managers."
            items={JSON.stringify(['Team oversight', 'Reports & analytics', 'Approval workflows'])}
          />
        )}

        {isAuthenticated && hasAnyRole(['admin', 'manager']) && (
          <omnifex-card
            appearance={Appearance.OUTLINED}
            variant={Variant.TERTIARY}
            icon="📈"
            cardTitle="Leadership Insights"
            description="Visible to admins and managers."
            items={JSON.stringify(['Performance metrics', 'Strategic planning', 'Resource allocation'])}
          />
        )}

        {isAuthenticated && hasRole('user') && (
          <omnifex-card
            appearance={Appearance.FILLED}
            variant={Variant.PRIMARY}
            icon="👤"
            cardTitle="User Content"
            description="This content is visible to all authenticated users."
            items={JSON.stringify(['Personal dashboard', 'Profile settings', 'Activity history'])}
          />
        )}

        <omnifex-card
          appearance={Appearance.FILLED}
          variant={Variant.PRIMARY}
          icon="⭐"
          cardTitle="Primary Variant Card"
          description="This card uses the PRIMARY variant from the Variant enum."
          items={JSON.stringify(['Primary styling', 'Accent colors', 'Light background'])}
        />

        <omnifex-card
          appearance={Appearance.FILLED}
          variant={Variant.SECONDARY}
          icon="✨"
          cardTitle="Secondary Variant Card"
          description="This card uses the SECONDARY variant from the Variant enum."
          items={JSON.stringify(['Secondary styling', 'Surface colors', 'Subtle background'])}
        />

        <omnifex-card
          appearance={Appearance.FILLED}
          variant={Variant.TERTIARY}
          icon="🎨"
          cardTitle="Tertiary Variant Card"
          description="This card uses the TERTIARY variant from the Variant enum."
          items={JSON.stringify(['Tertiary styling', 'Muted colors', 'Background tertiary'])}
        />

        <omnifex-card
          appearance={Appearance.FILLED}
          variant={Variant.INVERSE}
          icon="🌙"
          cardTitle="Inverse Variant Card"
          description="This card uses the INVERSE variant from the Variant enum."
          items={JSON.stringify(['Inverse styling', 'Dark background', 'Light text'])}
        />
      </div>
    </main>
  );
};

export default Dashboard;
