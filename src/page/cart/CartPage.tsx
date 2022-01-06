import { randomUUID } from 'crypto'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {ItemCart} from '../../model/Product'
import './CartPage.css'
import CheckoutForm from './CheckoutForm'
import ItemCartRender from './ItemCartRender'
import { v4 as uuid } from 'uuid';
import { Order } from '../../model/Order'
import { cartController } from '../../controller/CartController'
import { userController } from '../../controller/UserController'
import { OrderProduct } from '../../model/OrderProduct'
import { User } from '../../model/User'
interface Props{
    setMessage:(mess:string)=>void,
    order:Order,
}
export interface State{
    itemCarts:ItemCart[],
    cartCount:number,
    totalMoney:number,
    value:number,
    isShowCheckOut:Boolean,
    order:Order,
    user:User
}


export default function CartPage(props:Props) {
    const [state,setState]=useState<State>({
        itemCarts:[],
        cartCount:0,
        totalMoney:0,
        value:0,
        isShowCheckOut:false,
        order:props.order,
        user:{id_user:props.order.id_user,name:"",address:"",phone:"",email:""}
    })
    console.log(props.order);
    
    useEffect(()=>{
        userController.getUser(state.order.id_user).then(res=>{
            cartController.list(res.id_order).then(res1=>{
                setState({...state,itemCarts:res1.list,order:res,cartCount:res1.list.length,totalMoney:res1.total})
            })
        })
        
    },[])


    const onChangeQuantity=(id:string,quantityChange:number,price:number,quantityBefore:number)=>{
        const change:OrderProduct={id_order:state.order.id_order,id:id,quantity:quantityChange,price:price}
        cartController.update(change).then(()=>{
            cartController.list(state.order.id_order).then(res1=>{
                setState({...state,itemCarts:res1.list,cartCount:res1.list.length,totalMoney:res1.total})
            })
        })
    }

    const onClickDeleteItemCarts=(id:string,quantity:number,price:number)=>{
        const deleteItem:OrderProduct={id_order:state.order.id_order,id:id,quantity:quantity,price:price}
        cartController.delete(deleteItem).then(()=>{
            cartController.list(state.order.id_order).then(res=>{
                setState({...state,itemCarts:res.list,cartCount:res.list.length,totalMoney:res.total})
            })
        })
        
        props.setMessage("Delete Successfully")
    }
    
    //change cart and payment
    const onclickShowCarts=()=>{
        setState({...state,isShowCheckOut:false})
    }

    //set Cart count
    const onClickSetCartCount=()=>{
        setState({...state,cartCount:0})
    }


    const showCart=()=>{
        if(state.cartCount>0){
            return  <div>
                        <table className="show-list fade">
                            <tbody>
                                <tr className="table-title">
                                    <th><p>Product</p></th>
                                    <th><p>Quantity</p></th>
                                    <th><p>Subtotal</p></th>
                                </tr>
                                
                                {state.itemCarts.map(item=><ItemCartRender key={uuid()}
                                    itemCart={item} 
                                    onChangeQuantity={onChangeQuantity} 
                                    onClickDeleteItemCarts={onClickDeleteItemCarts}
                                />)}
                                
                                <tr className="table-row">
                                    <td></td>
                                    <td className='table-column-2'>Total</td>
                                    <td className='table-column-3'>{state.totalMoney} $</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="button-checkout">
                            <button className='btn btn-change-checkout' onClick={()=>setState({...state,isShowCheckOut:true})}>Checkout</button>
                        </div>
                    </div>      
        }else{
            return <div className='cart-empty'>
                <img src="https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-29/90/empty_cart-512.png" alt="" />
                <h1>Your cart is Empty</h1>
                <Link to="/shop"><button className="btn">Back to shop</button></Link>
            </div>
        }
    }

    return (
        <>
            
            <div id="cart-page-container">
                {state.cartCount>0 ?
                    <div className="order-process-container fade">
                        <div className="order-process">
                            <div className="cart-page-show-info " onClick={()=>setState({...state,isShowCheckOut:false})}>
                                <p className={state.isShowCheckOut===true? 'css-page-num' : 'css-page-num-2' } >1</p>
                                <p className='name-1 '>Your Cart</p>
                            </div>
                            <div className="cart-page-show-info " onClick={()=>setState({...state,isShowCheckOut:true})}>
                                <p className={state.isShowCheckOut===true? 'css-page-num-2' : 'css-page-num' } onClick={()=>setState({...state,isShowCheckOut:true})}>2</p>
                                <p className='name-1 '>Payment</p>
                            </div>
                        </div>
                    </div> 
                : ""}

                {state.isShowCheckOut===true&&state.cartCount>0 ?
                    <CheckoutForm
                        itemCarts={state.itemCarts}
                        totalMoney={state.totalMoney}
                        onclickShowCarts={onclickShowCarts}
                        onClickSetCartCount={onClickSetCartCount}
                        setMessage={props.setMessage}
                        order={state.order}
                    />:
                        <div className="cart-page show">
                            <div className="show-list-container">
                                {showCart()}
                            </div>
                        </div>
                }

            </div>
        </>
    )
}
