import React, { useContext, useEffect, useState } from 'react'
import { ItemCart } from '../../model/Product'
import './Checkout.css'
import OrderItemShow from './OrderItemShow'
import {v4 as uuid} from 'uuid'
import { orderController } from '../../controller/OrderController'
import { Order } from '../../model/Order'
import { User } from '../../model/User'
import { userController } from '../../controller/UserController'
import { UserContext } from '../../context/UserContext'
import { OrderContext } from '../../context/OrderContext'
import { CartConText } from '../../context/CartContext'

interface Props{
    itemCarts: ItemCart[],
    totalMoney:number,
    onclickShowCarts:()=>void
    onClickSetCartCount:()=>void
    setMessage:(mess:string)=>void
    order:Order
}

interface State{
    order:Order,
    user:User
}
export default function CheckoutForm(props:Props) {
    const [state,setState]= useState<State>({
        order:props.order,
        user:{id_user:props.order.id_user,name:"",address:"",phone:"",email:""}
    })
    
    const userContext= useContext(UserContext)
    const cartContext = useContext(CartConText)
    useEffect(() => {
        userController.get(state.order.id_user).then(res=>{
            setState({...state,user:res})
        })
    }, [])
    
    const onClickCompleteOrder = ()=>{
        orderController.update(userContext.user.id_user,cartContext.order.id_order)
        props.onClickSetCartCount()
    }

    return (
        <div className="form-checkout-container fade">
            <div className="checkout-info-container">
                <h2 className="checkout-info-title">Your info:</h2>
                <form action="" className="checkout-form">
                    <div className="checkout-first-name">
                        <label htmlFor="">First name:</label>
                        <input type="text"  className="checkout-input-name" onChange={e=>setState({...state,user:{...state.user,name:e.target.value}})} value={state.user.name}/>
                    </div>
                    <div className="checkout-first-name">
                        <label htmlFor="">Email:</label>
                        <input type="text"  className="checkout-input-name" onChange={e=>setState({...state,user:{...state.user,email:e.target.value}})} value={state.user.email}/>
                    </div>
                    <div className="checkout-first-name">
                        <label htmlFor="">Your Address:</label>
                        <input type="text"  className="checkout-input-name" onChange={e=>setState({...state,user:{...state.user,address:e.target.value}})} value={state.user.address}/>
                    </div>
                    <div className="checkout-first-name">
                        <label htmlFor="">Your phone:</label>
                        <input type="text"  className="checkout-input-name" onChange={e=>setState({...state,user:{...state.user,phone:e.target.value}})} value={state.user.phone}/>
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
