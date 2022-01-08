import './App.css';
import React, { useContext, useEffect, useState } from 'react';
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
import { stringify } from 'querystring';
import { User } from './model/User';
import { userController } from './controller/UserController';
import { cartController } from './controller/CartController';
import OrderContextProvider, { OrderContext } from './context/OrderContext';
import UserContextProvider, { UserContext } from './context/UserContext';

interface State{
  isShowMessage:Boolean,
  message:string,
  order:Order,
  user:User
}

function App() {
  const [state,setState] = useState<State>({
    isShowMessage:false,
    message:"",
    order:{id_order:"",id_user:"9999",total:0,is_temporary:false,timeOrder:"12345678956"},
    user:{address:"",email:"",id_user:"",name:"",phone:""}
  })

  const userContext=useContext(UserContext)

  const setMessage =(mess:string)=>{
    setState({...state,isShowMessage:true,message:mess})
    setTimeout(()=>{setState({...state,isShowMessage:false})},2000)
  }

  const setUserInfo=(user:User)=>{
    setState({...state,user:user})
  }

  useEffect(() => {
  }, [])


  window.onload = () => {
    if(localStorage.getItem('accessToken')){
      userController.getMe().then(res=>{
        userContext.changeUser(res)
      })
      // const timeExpired=isTokenExpired(localStorage.getItem('accessToken')|| "")
      // if(timeExpired>0){
      //   setTimeout(()=>{
      //     localStorage.removeItem('accessToken')
      //     alert('Your login is expired pls login again')
      //     window.location.href='/login'
      // },timeExpired*1000)
      // }
    }
  }

  const  isTokenExpired=(token:string)=> {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiry-(Math.floor((new Date).getTime() / 1000));
  }


  


  return (
    <Router>
      <div>
          <OrderContextProvider>
          <UserContextProvider>
            {state.isShowMessage? <PopupMessage message={state.message}/> : ""}
            <Header user={state.user}/>
            <Routes>
              <Route path="login" element={<Login setUserInfo={setUserInfo} user={state.user}/>} />
              <Route path="/" element={<HomePage setUserInfo={setUserInfo} />}/>
              <Route path="home" element={<HomePage setUserInfo={setUserInfo} />} />
              <Route path="admin" element={<Products setMessage={setMessage}/>} />
              <Route path="cart" element={<CartPage setMessage={setMessage} order={state.order} />}/>
              <Route path="shop" element={<ShopPage setMessage={setMessage} order={state.order}/>}/>
              <Route path="product/:id" element={<ProductDetail/>}  />
              <Route path="order" element={<OrderList order={state.order}/>} />
            </Routes>
          </UserContextProvider>
          </OrderContextProvider>
      </div>
    </Router>
  );
}

export default App;
