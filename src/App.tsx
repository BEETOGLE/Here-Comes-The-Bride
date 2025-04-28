import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCategories from './components/Services';
import ProductShowcase from './components/ProductShowcase';
import About from './components/Testimonials';
import Consignment from './components/Consignment';
import Contact from './components/BusinessInfo';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <ProductCategories />
        <ProductShowcase />
        <Consignment />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
