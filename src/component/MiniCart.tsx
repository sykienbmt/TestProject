import React from 'react'
import { ItemCart } from '../model/Product'
import ItemCartRender from '../page/cart/ItemCartRender'

interface Props{
    item:ItemCart
}

export default function MiniCart(props:Props) {
    console.log(props.item);
    
    return (
        <div className='cart-mini-render'>
            <div className="cart-mini-img">
                <img src={props.item.image} alt="" />
            </div>
            <h4 className="cart-mini-name">{props.item.name}</h4>
            <h4 className="cart-mini-quantity"><span className="quantity-mini-cart">X {props.item.quantity}</span></h4>
        </div>
    )
}
