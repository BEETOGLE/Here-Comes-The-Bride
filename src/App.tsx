import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCategories from './components/Services';
import ProductShowcase from './components/ProductShowcase';
import About from './components/Testimonials';
import Consignment from './components/Consignment';
import Contact from './components/BusinessInfo';
import Footer from './components/Footer';
import DreamFinder from './components/DreamFinder';
import Admin from './pages/Admin';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import './App.css';

const MainLayout: React.FC = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <ProductCategories />
      <ProductShowcase />
      <DreamFinder />
      <Consignment />
      <About />
      <Contact />
    </main>
    <Footer />
  </>
);

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <AuthProvider>
      {currentPath === '/admin' ? (
        <ProtectedRoute>
          <Admin />
        </ProtectedRoute>
      ) : (
        <MainLayout />
      )}
    </AuthProvider>
  );
};

export default App;
