import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './page/home/HomePage';
import Header from './component/Header';
import Footer from './component/Footer';
import Products from './page/products/Products';
import CartPage from './page/cart/CartPage';


function App() {



  return (
    <Router>
      <div>
          <Header/>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="home" element={<HomePage/>}/>
              <Route path="products" element={<Products/>} />
              <Route path="cart" element={<CartPage/>}/>
            </Routes>
          <Footer/>
      </div>
    </Router>
  );
}

export default App;
