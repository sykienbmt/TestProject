import './ProductsAdmin.css'
import React, { useState } from 'react'
import {ProductItem} from './ProductItemAdmin'
import { Product } from '../../model/Product'
import Form from './FormAddAdmin'
import { v4 as uuid } from 'uuid';


interface Props {
    onAddEditProduct: (product:Product)=> void,
    productEdit:Product
    onDelete: (idProduct:string) => void
    onClickShowInfo:(product:Product)=> void 
    products:Product[]
    isEdit:Boolean
    onEditForm:(isEdit:Boolean) =>void
    showPopup:Boolean
    onEditShowPopup:(showPopUp:Boolean)=>void
};

export default function Products(props:Props) {
    return (
        <>

            {props.showPopup===true ? <Form key={uuid()} onAddEditProduct={props.onAddEditProduct} productEdit={props.productEdit} isEdit={props.isEdit} onEditForm={props.onEditForm} onEditShowPopup={props.onEditShowPopup}/>:""}
            <section id="product-container">
            

                <div className="title-button">
                    <h1 className="product-container-title">ADMIN PAGE</h1>
                    <button className="btn-add-product btn" onClick={()=>{props.onEditShowPopup(true)}}>Add Product</button>
                </div>

                <div className="list-product">
                    {props.products.map((item)=>  <ProductItem product={item} onDelete={props.onDelete} onClickShowInfo={props.onClickShowInfo}  key={item.id}/>)}
                </div>
                
            </section>
        </>
    )
}
