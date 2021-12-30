import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getListFromLocal ,ItemCart, setCartsToLocal} from '../../model/ItemCart'
import './CartPage.css'
import CheckoutForm from './CheckoutForm'
import ItemCartRender from './ItemCartRender'

interface Props{
    setMessage:(mess:string)=>void
}
export interface State{
    itemCarts:ItemCart[],
    cartCount:number,
    totalMoney:number,
    value:number,
    isShowCheckOut:Boolean
}

export default function CartPage(props:Props) {
    const [state,setState]=useState<State>({
        itemCarts:getListFromLocal(),
        cartCount:getListFromLocal().length,
        totalMoney:0,
        value:0,
        isShowCheckOut:false
    })

    useEffect(()=>{
        let totalMoney=0
        state.itemCarts.forEach(element => {
            totalMoney+= (element.price*element.quantity)
        });
        setState({...state,totalMoney:totalMoney})
    },[])


    //Thay doi so luong
    const onChangeQuantity=(quantity:number,id:string)=>{

        let index = state.itemCarts.findIndex(item=>item.id===id)
        let itemCartsFake=state.itemCarts
        itemCartsFake[index].quantity=quantity
        let totalMoney=0
        itemCartsFake.forEach(element => {
            totalMoney+= (element.price*element.quantity)
        });

        setState({...state,itemCarts:itemCartsFake,totalMoney:totalMoney})
        setCartsToLocal(state.itemCarts)
    }

    const onClickDeleteItemCarts=(id:string)=>{
        let itemCartsFake=state.itemCarts
        itemCartsFake=itemCartsFake.filter(item=>item.id!==id)
        setState({...state,itemCarts:itemCartsFake})
        setCartsToLocal(state.itemCarts)
        props.setMessage("Delete Successfully")
    }
    
    //doi giao dien thong tin thanh toan
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
                                
                                {state.itemCarts.map(item=><ItemCartRender key={+item.id} itemCart={item} onChangeQuantity={onChangeQuantity} onClickDeleteItemCarts={onClickDeleteItemCarts}/>)}
                                
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
