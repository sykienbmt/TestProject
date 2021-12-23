import React from 'react'
import './Products.css'
import { Product } from '../../model/Product'
import { useState } from 'react'

export interface Props {
    onDelete: (idProduct:string) => void
    onClickShowInfo:(product:Product)=> void 
    product: Product;
};

export function ProductItem(props:Props) {
    //filter, map, find,foreach, some,every
    return (
        <div className="product-item" >
            <div className="product-image" onClick={()=>props.onClickShowInfo(props.product)}>
                <img src="https://cdn.tgdd.vn/Products/Images/42/213033/iphone-12-pro-max-xanh-duong-new-600x600-600x600.jpg" alt="" className=""/>
            </div>
            <div className="rate">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star fa-star-none"></i>
            </div>
            <h3 className="product-name">{props.product.name}</h3>
            <div className="price">
                <a className="price-underline">1500$</a>    
                <a className="product-price">{props.product.price}$</a>
            </div>
            <button className="product-buy btn" onClick={()=>props.onDelete(props.product.productId)} >Remove</button>
        </div>
    )
}
