import React, { useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../identity-wrapper';
import { useTheme } from '../hooks/useTheme';
import './Layout.css';

const Layout: React.FC = () => {
  const { isAuthenticated, isLoading, user, login, logout, roles } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const headerRef = useRef<HTMLElement>(null);

  const userName = user?.profile?.name || user?.profile?.sub || '';

  // Handle omnifex-header events
  /*useEffect(() => {
    const handleLoginClick = () => {
      login();
    };
    const handleLogoutClick = () => {
      logout();
    };
    const handleThemeToggle = () => {
      toggleTheme();
    };

    const findAndAttach = () => {
      const headerEl = headerRef.current;
      if (headerEl) {
        headerEl.addEventListener('login-click', handleLoginClick);
        headerEl.addEventListener('logout-click', handleLogoutClick);
        headerEl.addEventListener('theme-toggle', handleThemeToggle);
        return true;
      }
      return false;
    };

    let attempts = 0;
    const tryAttach = () => {
      if (findAndAttach() || attempts >= 10) {
        return;
      }
      attempts++;
      setTimeout(tryAttach, 50);
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!findAndAttach()) {
          tryAttach();
        }
      });
    });

    return () => {
      const headerEl = headerRef.current;
      if (headerEl) {
        headerEl.removeEventListener('login-click', handleLoginClick);
        headerEl.removeEventListener('logout-click', handleLogoutClick);
        headerEl.removeEventListener('theme-toggle', handleThemeToggle);
      }
    };
  }, [login, logout, toggleTheme]);*/
  useEffect(() => {
    const handleLoginClick = () => login();
    const handleLogoutClick = () => logout();
    const handleThemeToggle = () => toggleTheme();
  
    let attachedEl: HTMLElement | null = null;
  
    // track async work so we can cancel it
    let raf1 = 0;
    let raf2 = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let disposed = false;
  
    const attach = (el: HTMLElement) => {
      if (attachedEl === el) return true; // already attached to this element
  
      // if previously attached to a different element, detach first
      if (attachedEl) {
        attachedEl.removeEventListener('login-click', handleLoginClick);
        attachedEl.removeEventListener('logout-click', handleLogoutClick);
        attachedEl.removeEventListener('theme-toggle', handleThemeToggle);
      }
  
      el.addEventListener('login-click', handleLoginClick);
      el.addEventListener('logout-click', handleLogoutClick);
      el.addEventListener('theme-toggle', handleThemeToggle);
      attachedEl = el;
      return true;
    };
  
    const findAndAttach = () => {
      const el = headerRef.current as HTMLElement | null;
      return el ? attach(el) : false;
    };
  
    let attempts = 0;
    const tryAttach = () => {
      if (disposed) return;
      if (findAndAttach() || attempts >= 10) return;
      attempts++;
      timeoutId = setTimeout(tryAttach, 50);
    };
  
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (!findAndAttach()) {
          tryAttach();
        }
      });
    });
  
    return () => {
      disposed = true;
  
      if (timeoutId) clearTimeout(timeoutId);
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
  
      // IMPORTANT: use the captured element, not headerRef.current
      if (attachedEl) {
        attachedEl.removeEventListener('login-click', handleLoginClick);
        attachedEl.removeEventListener('logout-click', handleLogoutClick);
        attachedEl.removeEventListener('theme-toggle', handleThemeToggle);
        attachedEl = null;
      }
    };
  }, [login, logout, toggleTheme]);
  

  // Update omnifex-header properties when they change
  // Note: roles are passed as JSON string via prop, other props are updated directly
  useEffect(() => {
    const updateProps = () => {
      const headerEl = headerRef.current as any;
      if (headerEl) {
        headerEl.isLoading = isLoading;
        headerEl.isAuthenticated = isAuthenticated;
        headerEl.userName = userName;
        headerEl.isDark = isDark;
        // roles are handled via prop (JSON string), but we can also set directly as array
        headerEl.roles = roles;
      }
    };

    updateProps();
    const timer = setTimeout(updateProps, 50);
    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated, userName, isDark, roles]);

  return (
    <div className="layout">
      <omnifex-header
        ref={headerRef}
        isLoading={isLoading}
        isAuthenticated={isAuthenticated}
        userName={userName}
        isDark={isDark}
        roles={roles.length > 0 ? JSON.stringify(roles) : '[]'}
      />

      <main className="layout-main">
        <Outlet />
      </main>

      <omnifex-footer
        text="Built with ❤️"
        framework="React"
      />
    </div>
  );
};

export default Layout;
