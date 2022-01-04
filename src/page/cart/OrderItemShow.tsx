import React from 'react'
import { ItemCart } from '../../model/Product'

interface Props{
    item:ItemCart
}

export default function OrderItemShow(props:Props) {
    return (
        <div className="order-item-info">
            <img src={props.item.image} alt="" />
            <p>{props.item.name}</p>
            <p><i className="fas fa-times"></i> {props.item.quantity}</p>
            <p className='order-item-info-last'>{props.item.quantity*props.item.price} $</p>
        </div>
    )
}
