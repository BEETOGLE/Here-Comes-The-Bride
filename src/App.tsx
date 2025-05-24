import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
  // Get the base URL from the homepage in package.json or default to '/'
  const baseUrl = process.env.PUBLIC_URL || '/';

  return (
    <BrowserRouter basename={baseUrl}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
