import React, { createContext, ReactNode, useState } from "react";
import { cartController } from "../controller/CartController";
import { userController } from "../controller/UserController";
import { Order } from "../model/Order";
import { OrderProduct } from "../model/OrderProduct";
import { ItemCart } from "../model/Product";

interface OrderContextProps{
    children: ReactNode
}

type State={
    itemCarts:ItemCart[],
    cartCount:number,
    totalMoney:number,
    order:Order,
    getInfoCart:(id_user:string)=>void,
    onChangeQuantity:(id:string,quantityChange:number,price:number)=>void,
    onClickDeleteItemCarts:(id:string,quantity:number,price:number)=>void,
    onClickAddToCart:(id:string,price:number)=>void
}

const stateDefaultValue={
    itemCarts:[],
    cartCount:0,
    totalMoney:0,
    order:{id_order:"", id_user:"", total:0, is_temporary:true, timeOrder:""},
    getInfoCart:()=>{},
    onChangeQuantity:()=>{},
    onClickDeleteItemCarts:()=>{},
    onClickAddToCart:()=>{}
}

export const CartConText = createContext<State>(stateDefaultValue)

const CartContextProvider = ({children}:OrderContextProps)=>{
    const [stateCart,setStateCart]=useState<State>(stateDefaultValue)

    const getInfoCart = (id_user:string)=>{
        cartController.list(id_user).then(res=>{
            setStateCart({...stateCart,itemCarts:res.list,cartCount:res.list.length,totalMoney:res.total})
        }).then(()=>{
            userController.getOrderInfo(id_user).then(res=>{
                setStateCart({...stateCart,order:res})
            })
        })
    }

    const onChangeQuantity=(id:string,quantityChange:number,price:number)=>{
        const change:OrderProduct={id_order:stateCart.order.id_order,id:id,quantity:quantityChange,price:price}
        cartController.update(change).then(res=>{
            setStateCart({...stateCart,itemCarts:res})
        })
    }

    const onClickDeleteItemCarts=(id:string)=>{
        cartController.delete(id,stateCart.order.id_order).then(res=>{
            setStateCart({...stateCart,itemCarts:res})
        })
    }

    const onClickAddToCart=(id:string,price:number)=>{
        const order_product:OrderProduct={id_order:stateCart.order.id_order,id:id,quantity:1,price:price}
        cartController.add(order_product)
    }


    const data:State={itemCarts:stateCart.itemCarts,
        cartCount:stateCart.cartCount,
        order:stateCart.order,
        totalMoney:stateCart.totalMoney,
        getInfoCart,
        onChangeQuantity,
        onClickDeleteItemCarts,
        onClickAddToCart}

    return(
        <CartConText.Provider value={data}>
            {children}
        </CartConText.Provider>
    )
}

export default CartContextProvider