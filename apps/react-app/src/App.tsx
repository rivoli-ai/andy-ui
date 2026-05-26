import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './identity-wrapper';
import { ThemeProvider } from './hooks/useTheme';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Callback from './components/Callback';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  useEffect(() => {
    // Additional runtime error suppression for injected scripts
    const handleError = (event: ErrorEvent) => {
      if (event.message?.includes('_0x') || event.filename?.includes('webkit-masked-url')) {
        console.warn('App: Suppressed injected script error');
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
