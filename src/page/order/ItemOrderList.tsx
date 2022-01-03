import React, { useEffect, useState } from 'react'
import { orderController } from '../../controller/OrderController';
import { OrderWithDetailAddress } from '../../model/Order';
import ItemChildOrder from './ItemChildOrder';


interface Props{
    itemOrder:OrderWithDetailAddress
}
// interface State{

// }
export default function ItemOrderList(props:Props) {


    const sumToTal = ()=>{
        let  total=0
        props.itemOrder.orderProducts.map(item=>{
            total+= item.price*item.quantity
        })
        return total
    }

    
    // const convertDay = ()=>{
    //     var d = new Date(Number(props.itemOrder));
    //     var time =d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()+ " - ";
    //     let day:string = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()}` 
    //     time =time + day
    //     return time
    // }



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
                        <p>{props.itemOrder.timeOrder}</p>
                    </div>
                    <p className="order-info-address"><span>{props.itemOrder.userInfo.email+" | "+props.itemOrder.userInfo.phone +" | "+ props.itemOrder.userInfo.address}</span> </p>
                </div>
            </div>
            {props.itemOrder.orderProducts.map(item=><ItemChildOrder key={item.id} itemChild={item}/>)}


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
