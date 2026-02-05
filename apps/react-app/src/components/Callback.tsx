import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../identity-wrapper';
import './Callback.css';

const Callback: React.FC = () => {
  const { isLoading, error, handleCallback, login } = useAuth();
  const navigate = useNavigate();
  const [componentReady, setComponentReady] = useState(false);

  // Wait for StencilJS component to be defined
  useEffect(() => {
    const waitForComponent = async () => {
      try {
        if (!customElements.get('omnifex-callback')) {
          await customElements.whenDefined('omnifex-callback');
        }
        setComponentReady(true);
      } catch (err) {
        console.error('Failed to load omnifex-callback component:', err);
        setComponentReady(true); // Proceed anyway to show error state
      }
    };

    waitForComponent();
  }, []);

  // Process OAuth callback only after component is ready
  useEffect(() => {
    if (!componentReady) return;

    const processCallback = async () => {
      try {
        const returnUrl = await handleCallback();
        navigate(returnUrl || '/', { replace: true });
      } catch (err) {
        // Error is handled by the auth context
        console.error('Callback processing failed:', err);
      }
    };

    processCallback();
  }, [componentReady, handleCallback, navigate]);

  // Handle omnifex-callback retry event
  useEffect(() => {
    if (!error || !componentReady) return;

    const handleRetryClick = () => {
      login();
    };

    // Use setTimeout to ensure element is rendered
    const timer = setTimeout(() => {
      const callbackEl = document.querySelector('omnifex-callback') as HTMLElement;
      if (callbackEl) {
        callbackEl.addEventListener('retry-click', handleRetryClick);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      const callbackEl = document.querySelector('omnifex-callback') as HTMLElement;
      if (callbackEl) {
        callbackEl.removeEventListener('retry-click', handleRetryClick);
      }
    };
  }, [login, error, componentReady]);

  // Show loading state while waiting for component
  if (!componentReady) {
    return (
      <div className="callback-container">
        <div className="loading">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="callback-container">
      <omnifex-callback
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default Callback;