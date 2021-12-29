import './App.css';
import React, { useState } from 'react';
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
import PopupMessage from './component/PopupMessage';

interface State{
  isShowMessage:Boolean,
  message:string
}

function App() {
  
  const [state,setState] = useState<State>({isShowMessage:false,message:""})

  const setMessage =(mess:string)=>{
    setState({isShowMessage:true,message:mess})
    setTimeout(()=>{setState({...state,isShowMessage:false})},2000)
  }
  
  return (
    <Router>
      <div>
          {state.isShowMessage? <PopupMessage message={state.message}/> : ""}
          <Header />
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="home" element={<HomePage/>}/>
              <Route path="shop" element={<ShopPage setMessage={setMessage}/>}/>
              <Route path="admin" element={<Products setMessage={setMessage}/>} />
              <Route path="cart" element={<CartPage setMessage={setMessage}/>}/>
              <Route path="product/:id" element={<ProductDetail/>}  />
              <Route path="order" element={<OrderList/>}  />
            </Routes>
          
      </div>
    </Router>
  );
}

export default App;
