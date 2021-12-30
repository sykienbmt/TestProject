import React, { useState } from 'react'
import { OrderTest } from '../../model/OrderTest'
import ItemChildOrder from './ItemChildOrder';


interface Props{
    orderTest:OrderTest
}
export default function ItemOrderList(props:Props) {

    const sumToTal = ()=>{
        let  total=0
        props.orderTest.listOrder.forEach(item => {
            total+=item.price*item.quantity
        });
        return total
    }

    const convertDay = ()=>{
        var d = new Date(Number(props.orderTest.time));
        var time =d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()+ " - ";
        let day:string = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()}` 
        time =time + day
        return time
    }
    return (
        <div className="order-history-item">
            <div className="order-history-item-info">
                <div className="order-history-shop">
                    <i className="fas fa-store-alt"></i>
                    <h3 className="order-shop-name">Shop Starr</h3>
                    <button className="order-shop-go btn">ViewShop</button>
                </div>
                <h4>Pending</h4>
                <div className="order-information">
                    <div className="order-info-time">
                        <p>{convertDay()}</p>
                    </div>
                    <p className="order-info-address"><span>{props.orderTest.email+" | "+props.orderTest.phone +" | "+ props.orderTest.address}</span> </p>
                </div>
            </div>
            {props.orderTest.listOrder.map(item=><ItemChildOrder key={item.id} itemCart={item}/>)}


            <div className="order-item-price">
                <div className="order-item-price-left">
                    <p className="order-item-cost">Cost: <span>{sumToTal()} $</span></p>
                    <p className="order-item-cost">Ship: <span>0 $</span></p>
                </div>
                <div className="order-item-price-total">
                    Total: <span>{sumToTal()} $</span>
                </div>
            </div>
        </div>
    )
}
