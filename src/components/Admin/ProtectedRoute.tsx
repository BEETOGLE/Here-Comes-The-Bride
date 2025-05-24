import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Login from './Login';
import { FirebaseError } from 'firebase/app';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuth();
  const [error, setError] = useState<string>();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/invalid-email':
            setError('Invalid email address');
            break;
          case 'auth/user-disabled':
            setError('This account has been disabled');
            break;
          case 'auth/user-not-found':
            setError('No account found with this email');
            break;
          case 'auth/wrong-password':
            setError('Incorrect password');
            break;
          default:
            setError('An error occurred during login');
        }
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} error={error} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 