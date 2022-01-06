import './App.css';
import React, { useEffect, useState } from 'react';
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
import { Order } from './model/Order';
import Login from './page/login/Login';


interface State{
  isShowMessage:Boolean,
  message:string,
  order:Order
}

function App() {
  const [state,setState] = useState<State>({
    isShowMessage:false,
    message:"",
    order:{id_order:"",id_user:"9999",total:0,is_temporary:false,timeOrder:"12345678956"}
  })
  
  const setMessage =(mess:string)=>{
    setState({...state,isShowMessage:true,message:mess})
    setTimeout(()=>{setState({...state,isShowMessage:false})},2000)
  }
  
  useEffect(()=>{
  },[])
  
  return (
    <Router>
      <div>
          {state.isShowMessage? <PopupMessage message={state.message}/> : ""}
          <Header />
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="home" element={<HomePage/>}/>
              <Route path="admin" element={<Products setMessage={setMessage}/>} />
              <Route path="cart" element={<CartPage setMessage={setMessage} order={state.order} />}/>
              <Route path="shop" element={<ShopPage setMessage={setMessage} order={state.order} />}/>
              <Route path="product/:id" element={<ProductDetail/>}  />
              <Route path="order" element={<OrderList order={state.order}/>} />
            </Routes>
      </div>
    </Router>
  );
}

export default App;
