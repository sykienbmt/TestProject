import React from 'react'
import { Link } from 'react-router-dom';
import { Product } from '../../model/Product'
import './ShopPage.css'


interface Props{
    product:Product
    onClickAddToCart:(id:String)=>void
}


export default function ShopItem(props:Props) {

    const onClickAddToCart=()=>{
        // console.log(props.product.id);
        props.onClickAddToCart(props.product.id)
    }

    return (
        <div className="product-item" >
            <div className="product-image" >
                <Link to={"/product/" + props.product.id}>
                    <img src={props.product.image} alt="" className=""/>
                </Link>
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
                <span className="product-sale">{props.product.price} $</span>
                <span className="product-price">9999 $</span>
            </div>
            <button className="product-buy btn"  onClick={onClickAddToCart}>Add to Cart</button>
            <i className="far fa-thumbs-up icon-like" ></i>
            <i className="fas fa-heart icon-like" ></i>
            <i className="fas fa-cart-arrow-down icon-like"></i>
        </div>
    )
}
