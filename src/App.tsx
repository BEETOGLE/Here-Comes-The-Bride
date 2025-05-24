import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<MainLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
