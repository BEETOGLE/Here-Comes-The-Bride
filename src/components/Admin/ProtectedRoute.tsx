import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Login from './Login';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuth();
  const [error, setError] = useState<string>();

  const handleLogin = async (username: string, password: string) => {
    try {
      const success = await login(username, password);
      if (!success) {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} error={error} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 