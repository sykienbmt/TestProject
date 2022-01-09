import { randomUUID } from 'crypto'
import React, { useContext, useEffect, useState } from 'react'
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
import { UserContext } from '../../context/UserContext'
import { OrderContext } from '../../context/OrderContext'
import { CartConText } from '../../context/CartContext'
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
    const userConText = useContext(UserContext)
    const cartContext = useContext(CartConText)

    const [state,setState]=useState<State>({
        itemCarts:cartContext.itemCarts,
        cartCount:cartContext.cartCount,
        totalMoney:cartContext.totalMoney,
        value:0,
        isShowCheckOut:false,
        order:props.order,
        user:{id_user:props.order.id_user,name:"",address:"",phone:"",email:""}
    })

    
    useEffect(()=>{
        userController.getMe().then(res=>{
            userConText.changeUser(res);
            cartContext.getInfoCart(res.id_user) 
        })
    },[])

    useEffect(()=>{
        setState({...state,itemCarts:cartContext.itemCarts,cartCount:cartContext.cartCount,
            totalMoney:cartContext.totalMoney})
    },[cartContext.itemCarts])
    

    // const onChangeQuantity=(id:string,quantityChange:number,price:number)=>{
    //     const change:OrderProduct={id_order:state.order.id_order,id:id,quantity:quantityChange,price:price}
    //     cartController.update(change).then(()=>{
    //         cartController.list().then(res1=>{
    //             console.log(res1);
    //             setState({...state,itemCarts:res1.list,cartCount:res1.list.length,totalMoney:res1.total})
    //             cartContext.setCartCount(res1.list.length)
    //         })
    //     })
    // }

    // const onClickDeleteItemCarts=(id:string)=>{
    //     cartContext.onClickDeleteItemCarts(id)
    //     console.log(state.itemCarts);
        
    //     props.setMessage("Delete Successfully")
    // }
    
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
                                
                                {state.itemCarts &&state.itemCarts.length>0 && state.itemCarts.map(item=><ItemCartRender key={uuid()}
                                    itemCart={item} 
                                    // onChangeQuantity={onChangeQuantity} 
                                    // onClickDeleteItemCarts={onClickDeleteItemCarts}
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
                {cartContext.cartCount>0 ?
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

                {state.isShowCheckOut===true && state.cartCount>0 && state.itemCarts ?
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
