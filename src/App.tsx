import './App.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './page/home/HomePage';
import Header from './component/Header';
import Footer from './component/Footer';
import Products from './page/admin/ProductsAdmin';
import CartPage from './page/cart/CartPage';
import { Product } from './model/Product'
import { v4 as uuid } from 'uuid';
import ShopPage from './page/shop/ShopPage';
import axios from 'axios'
import { productController } from './controller/ProductController';
import { createScanner } from 'typescript';
import ProductDetail from './page/product/ProductDetail';
import OrderList from './page/order/OrderList';


export interface State {
  products: Product[]
  product: Product
  isEdit:Boolean
  showPopup:Boolean
}

function App() {
  const [state, setState] = useState<State>({
    products: [],
    product:  {id:"",name:"",price:0,image:""},
    isEdit:false,
    showPopup:false
  });

  
  useEffect(() => {
    productController.list().then(res=>{
      setState({...state,products:res})
    })
  }, []);

  //is
  const onEditForm =(isEdit:Boolean)=>{
    setState({...state,isEdit:isEdit})
  }

  const onDelete = (idProduct:string) => {
    productController.delete(idProduct).then(res=>{
      setState({...state,products:res})
    })
  };

  //add-edit product
  const onAddEditProduct=(product:Product) =>{
    let listProduct:Product[]=state.products;
    if(product.id===""){
        product.id=uuid();
        productController.add(product).then(res=>{
          setState({...state,products:res})
        })
    }else{
        productController.update(product).then(res=>{
          setState({...state,products:res})
        })
    }

    setState({...state,products:listProduct})
    let productClear={id:"",name:"",price:0,image:""};
    setState({...state,product:productClear})
  }

  //set product to show edit
  const onClickShowInfo =(productShow:Product)=>{
    console.log(productShow);
    setState({...state,product:productShow,isEdit:true,showPopup:true})
  }

  //show popup
  const onEditShowPopup = (showPopup:Boolean)=>{
    setState({...state,isEdit:false,showPopup: showPopup,product:{id:"",name:"",price:0,image:""}})
  }

  const setListProductToLocal=(listProduct:Product[])=>{
    localStorage.setItem('listProduct',JSON.stringify(listProduct))
  }

  return (
    <Router>
      <div>
          <Header />
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="home" element={<HomePage/>}/>
              <Route path="shop" element={<ShopPage key={uuid()}/>}/>
              <Route path="admin" element={<Products  key={uuid()}
                                                      onAddEditProduct={onAddEditProduct}
                                                      productEdit={state.product}
                                                      onDelete={onDelete}
                                                      onClickShowInfo={onClickShowInfo}
                                                      products={state.products}
                                                      isEdit={state.isEdit}
                                                      onEditForm={onEditForm}
                                                      showPopup={state.showPopup}
                                                      onEditShowPopup={onEditShowPopup}
                                            />} />
              <Route path="cart" element={<CartPage/>}/>
              <Route path="product/:id" element={<ProductDetail/>}  />
              <Route path="order" element={<OrderList/>}  />
            </Routes>
          
      </div>
    </Router>
  );
}

export default App;
