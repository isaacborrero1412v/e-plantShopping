import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <h1>Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
          <button className="get-started-button" onClick={() => setShowProductList(true)}>
            Get Started
          </button>
          <AboutUs />
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;