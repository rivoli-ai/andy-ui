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
          <omnifex-button variant={Variant.PRIMARY}>Primary Button</omnifex-button>
          <omnifex-button variant={Variant.SECONDARY}>Secondary Button</omnifex-button>
          <omnifex-button variant={Variant.PRIMARY} appearance={Appearance.OUTLINED}>Outline Button</omnifex-button>
        </div>
        <div className="dashboard-badges">
          <omnifex-badge variant={Variant.PRIMARY}>Primary</omnifex-badge>
          <omnifex-badge variant={Variant.SECONDARY}>Secondary</omnifex-badge>
          <omnifex-badge variant={Variant.TERTIARY}>Tertiary</omnifex-badge>
          <omnifex-badge variant={Variant.INVERSE}>Inverse</omnifex-badge>
        </div>
      </div>

      <div className="dashboard-cards">
        <Location />

        {/* Admin-only card */}
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

        {/* Manager-only card */}
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

        {/* Card visible to both admin and manager */}
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

        {/* User-only card (all authenticated users have this role) */}
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

        {/* Example cards using Variant enum */}
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
