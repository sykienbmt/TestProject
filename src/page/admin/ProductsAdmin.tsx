import './ProductsAdmin.css'
import React, { useEffect, useState } from 'react'
import {ProductItem} from './ProductItemAdmin'
import { Product } from '../../model/Product'
import Form from './FormAddAdmin'
import { v4 as uuid } from 'uuid';
import { productController } from '../../controller/ProductController'


interface Props{
    setMessage:(mess:string)=>void
}
export interface State {
    products: Product[]
    product: Product
    isEdit:Boolean
    showPopup:Boolean
  }

export default function Products(props:Props) {

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
    productController.delete(idProduct).then(()=>productController.list().then(res=>{setState({...state,products:res})}))
    
    props.setMessage("Delete Successfully")
  };
    
  //add-edit product
  const onAddEditProduct=(product:Product) =>{
    // let listProduct:Product[]=state.products;
    if(product.id===""){
        product.id=uuid();
        productController.add(product).then(()=>productController.list().then(res=>{setState({...state,products:res})}))
        props.setMessage("Add Successfully")
    }else{
        productController.update(product).then(()=>productController.list().then(res=>{setState({...state,products:res})}))
        props.setMessage("Update Successfully")
    }
    // setState({...state,products:listProduct})
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
    
    
  return (
      <>
          {state.showPopup===true ? <Form key={uuid()} onAddEditProduct={onAddEditProduct} productEdit={state.product} isEdit={state.isEdit} onEditForm={onEditForm} onEditShowPopup={onEditShowPopup}/>:""}
          <section id="product-container">
          

              <div className="title-button">
                  <h1 className="product-container-title">ADMIN PAGE</h1>
                  <button className="btn-add-product btn" onClick={()=>{onEditShowPopup(true)}}>Add Product</button>
              </div>

              <div className="list-product">
                  {state.products.map((item)=>  <ProductItem product={item} onDelete={onDelete} onClickShowInfo={onClickShowInfo}  key={item.id}/>)}
              </div>
          </section>
      </>
  )
}
