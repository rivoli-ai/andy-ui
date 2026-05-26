import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../identity-wrapper';

const Login: React.FC = () => {
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const loginRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const returnUrl = searchParams.get('returnUrl') || '/';

  useEffect(() => {
    const waitForComponent = async () => {
      try {
        if (!customElements.get('omnifex-login')) {
          await customElements.whenDefined('omnifex-login');
        }
      } finally {
        setReady(true);
      }
    };
    waitForComponent();
  }, []);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(returnUrl, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, returnUrl]);

  useEffect(() => {
    if (!ready) return;
    const el = loginRef.current;
    if (!el) return;

    const handler = () => {
      void login(returnUrl);
    };
    el.addEventListener('login-click', handler);
    return () => el.removeEventListener('login-click', handler);
  }, [ready, login, returnUrl]);

  if (!ready) return null;

  return (
    <omnifex-login
      ref={loginRef}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default Login;
