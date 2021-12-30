import React from 'react'
import './ProductsAdmin.css'
import { Product } from '../../model/Product'

export interface Props {
    onDelete: (idProduct:string) => void
    onClickShowInfo:(product:Product)=> void 
    product: Product;
};

export function ProductItem(props:Props) {
    //filter, map, find,foreach, some,every
    return (
        <div className="product-item">
            <i className="far fa-trash-alt fa-trash-alt-hide" onClick={()=>props.onDelete(props.product.id)}></i>
            <div className="product-image" onClick={()=>props.onClickShowInfo(props.product)}>
                <img src={props.product.image} alt="" className=""/>
            </div>
            <h3 className="product-name">{props.product.name}</h3>
            <div className="price">
                <p className="product-price">{props.product.price}$</p>
            </div>
            <button className="product-buy btn" onClick={()=>props.onDelete(props.product.id)} >Remove</button>
        </div>
    )
}
