import React from 'react'
import { ItemCart } from '../../model/ItemCart'

interface Props{
    itemCart:ItemCart
}


export default function ItemChildOrder(props:Props) {

    return (
        <div className="order-item-info-container">
            <div className="order-item-desc">
                <div className="order-item-desc-img">
                    <img src={props.itemCart.image} alt="" />
                </div>
                <div className="order-item-desc-info">
                    <p>{props.itemCart.name}</p>
                    <p>x {props.itemCart.quantity}</p>
                </div>
            </div>
            <p className="order-item-desc-price">{props.itemCart.price*props.itemCart.quantity} $</p>
        </div>
    )
}
