import React from 'react'
import { ItemCart } from '../../model/Product'
import { OrderProduct, OrderProductShow } from '../../model/OrderProduct'

interface Props{
    itemChild:OrderProductShow
}

export default function ItemChildOrder(props:Props) {

    return (
        <div className="order-item-info-container">
            <div className="order-item-desc">
                <div className="order-item-desc-img">
                    <img src={props.itemChild.product.image} alt="" />
                </div>
                <div className="order-item-desc-info">
                    <p>{props.itemChild.product.name}</p>
                    <p>x {props.itemChild.quantity}</p>
                </div>
            </div>
            <p className="order-item-desc-price">{props.itemChild.price*props.itemChild.quantity} $</p>
        </div>
    )
}
