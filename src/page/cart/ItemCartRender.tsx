import React, { useState } from 'react'
import { ItemCart}  from '../../model/ItemCart'
import { OrderProduct } from '../../model/OrderProduct'

interface Props{
    itemCart:ItemCart,
    onChangeQuantity:(id:string,quantityChange:number,price:number,quantityBefore:number)=>void
    onClickDeleteItemCarts:(id:string,quantity:number,price:number)=>void
}

interface State{
    value:number,
    itemCart:ItemCart
}

export default function ItemCartRender(props:Props) {

    const [state,setState]=useState<State>({value:props.itemCart.quantity,itemCart:props.itemCart})

    const onCLickPlus =()=>{
        setState({...state,itemCart:{...state.itemCart,quantity:state.itemCart.quantity+1},value:state.value+1})
        props.onChangeQuantity(state.itemCart.id,state.itemCart.quantity+1,state.itemCart.price,props.itemCart.quantity)
    }

    const onCLickMinus =()=>{
        if(state.value>1){
            setState({...state,itemCart:{...state.itemCart,quantity:state.itemCart.quantity-1},value:state.value-1})
            props.onChangeQuantity(state.itemCart.id,state.itemCart.quantity-1,state.itemCart.price,props.itemCart.quantity)
        }
    }

    return (
        <tr className="table-row">
            <td className="table-column-1">
                <div className="item-cart-render">
                    <img src={props.itemCart.image} alt="" />
                    <div className="item-cart-info">
                        <p className="item-cart-name">Name: {props.itemCart.name}</p>
                        <small className="item-cart-price">Price: {props.itemCart.price}$</small>
                        <p className="item-cart-remove" onClick={()=>props.onClickDeleteItemCarts(props.itemCart.id,props.itemCart.quantity,props.itemCart.price)}>Remove</p>
                    </div>
                </div>
            </td>
            <td className='table-column-2'>
                <button onClick={onCLickMinus}><i className="fas fa-minus"></i></button>

                <input type="number" min={1} id="" value={state.value} onChange={e=>props.onChangeQuantity(state.itemCart.id,Number(e.target.value),state.itemCart.price,props.itemCart.quantity)}/>

                <button onClick={onCLickPlus}><i className="fas fa-plus"></i></button>
            </td>
            <td className='table-column-3'>  {state.itemCart.quantity*state.itemCart.price} $</td>
        </tr>
    )
}
