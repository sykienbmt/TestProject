import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './page/home/HomePage';
import Header from './component/Header';
import Products from './page/admin/ProductsAdmin';
import CartPage from './page/cart/CartPage';
import ShopPage from './page/shop/ShopPage';
import ProductDetail from './page/product/ProductDetail';
import OrderList from './page/order/OrderList';



function App() {

  return (
    <Router>
      <div>
          <div className="popup-message">
              Successfully
          </div>
          <Header />
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="home" element={<HomePage/>}/>
              <Route path="shop" element={<ShopPage />}/>
              <Route path="admin" element={<Products />} />
              <Route path="cart" element={<CartPage/>}/>
              <Route path="product/:id" element={<ProductDetail/>}  />
              <Route path="order" element={<OrderList/>}  />
            </Routes>
          
      </div>
    </Router>
  );
}

export default App;
