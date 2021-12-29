import React, { useState } from 'react'
import { getListFromLocal, ItemCart}  from '../../model/ItemCart'

interface Props{
    itemCart:ItemCart,
    onChangeQuantity:(quantity:number,id:string)=>void
    onClickDeleteItemCarts:(id:string)=>void
}

interface State{
    value:number
}

export default function ItemCartRender(props:Props) {

    const [state,setState]=useState<State>({value:props.itemCart.quantity})

    const onCLickPlus =()=>{
        setState({...state,value:state.value+1})
        props.onChangeQuantity(+props.itemCart.quantity+1,props.itemCart.id)
    }

    const onCLickMinus =()=>{
        if(state.value>1){
            setState({...state,value:state.value-1})
            props.onChangeQuantity(+props.itemCart.quantity-1,props.itemCart.id)
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
                        <p className="item-cart-remove" onClick={()=>props.onClickDeleteItemCarts(props.itemCart.id)}>Remove</p>
                    </div>
                </div>
            </td>
            <td className='table-column-2'>
                <button onClick={onCLickMinus}><i className="fas fa-minus"></i></button>

                <input type="number" min={1} id="" value={state.value} onChange={e=>props.onChangeQuantity(Number(e.target.value),props.itemCart.id)}/>

                <button onClick={onCLickPlus}><i className="fas fa-plus"></i></button>
            </td>
            <td className='table-column-3'>  {+props.itemCart.quantity*props.itemCart.price} $</td>
        </tr>
    )
}
