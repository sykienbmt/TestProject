import React, { useState } from 'react'
import { getListFromLocal, ItemCart } from '../../model/ItemCart'
import { OrderTest } from '../../model/OrderTest'
import './Checkout.css'
import OrderItemShow from './OrderItemShow'
import {v4 as uuid} from 'uuid'
import { orderController } from '../../controller/OrderController'

interface Props{
    itemCarts: ItemCart[],
    totalMoney:number,
    onclickShowCarts:()=>void
    onClickSetCartCount:()=>void
    setMessage:(mess:string)=>void
}

interface State{
    orderTest: OrderTest ;
}
export default function CheckoutForm(props:Props) {
    const [state,setState]= useState<State>({orderTest:{buyerId:"",orderId:"",name:"",address:"",email:"",phone:"",time:Date.now(),listOrder:props.itemCarts}})

    const onClickCompleteOrder = ()=>{
        setState({...state,orderTest:{...state.orderTest,buyerId:"Starr",orderId:uuid(),time:Date.now()}})
        console.log(state.orderTest);
        orderController.addOrder(state.orderTest)
        localStorage.removeItem('carts')
        props.onClickSetCartCount()
        props.setMessage("Order Complete")
    }

    return (
        <div className="form-checkout-container fade">
            <div className="checkout-info-container">
                <h2 className="checkout-info-title">Your info:</h2>
                <form action="" className="checkout-form">
                    <div className="checkout-first-name">
                        <label htmlFor="">First name:</label>
                        <input type="text" onChange={e=>setState({...state,orderTest:{...state.orderTest,name:e.target.value}})} className="checkout-input-name" />
                    </div>
                    <div className="checkout-first-name">
                        <label htmlFor="">Email:</label>
                        <input type="text" onChange={e=>setState({...state,orderTest:{...state.orderTest,email:e.target.value}})} className="checkout-input-name" />
                    </div>
                    <div className="checkout-first-name">
                        <label htmlFor="">Your Address:</label>
                        <input type="text" onChange={e=>setState({...state,orderTest:{...state.orderTest,address:e.target.value}})} className="checkout-input-name" />
                    </div>
                    <div className="checkout-first-name">
                        <label htmlFor="">Your phone:</label>
                        <input type="text" onChange={e=>setState({...state,orderTest:{...state.orderTest,phone:e.target.value}})} className="checkout-input-name" />
                    </div>
                </form>

            </div>
            <div className="carts-info-container">
                <h2 className="item-checkout-title">Your order</h2>
                {props.itemCarts.map(item=><OrderItemShow key={item.id} item={item} />)}
                <p className='total-money-carts'>Total: {props.totalMoney} $</p>
            </div>

            <div className="order-payment">
                <h2>Payment</h2>
                <div>
                    <input type="radio" name="payment" id="" />
                    <label htmlFor="">COD</label>
                </div>
                <div>
                    <input type="radio" name="payment" id="" />
                    <label htmlFor="">Momo</label>
                </div>
                <div>
                    <input type="radio" name="payment" id="" />
                    <label htmlFor="">Banking</label>
                </div>
            </div>

            <div className="group-button-checkout">
                <button className="btn-checkout-done btn" onClick={props.onclickShowCarts}>Back</button>
                <button className="btn-checkout-done btn" onClick={onClickCompleteOrder}>Done</button>
            </div>
        </div>
    )
}
