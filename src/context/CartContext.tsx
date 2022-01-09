import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authAxios } from "../controller";
import { cartController } from "../controller/CartController";
import { userController } from "../controller/UserController";
import { Order } from "../model/Order";
import { OrderProduct } from "../model/OrderProduct";
import { ItemCart } from "../model/Product";
import { UserContext } from "./UserContext";

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
    onClickDeleteItemCarts:(id:string)=>void,
    onClickAddToCart:(id:string,price:number)=>void,
    setCartCount:(number:number)=>void
}

const stateDefaultValue={
    itemCarts:[],
    cartCount:0,
    totalMoney:0,
    order:{id_order:"", id_user:"", total:0, is_temporary:true, timeOrder:""},
    getInfoCart:()=>{},
    onChangeQuantity:()=>{},
    onClickDeleteItemCarts:()=>{},
    onClickAddToCart:()=>{},
    setCartCount:()=>{}
}

export const CartConText = createContext<State>(stateDefaultValue)


const CartContextProvider = ({children}:OrderContextProps)=>{
    const [stateCart,setStateCart]=useState<State>(stateDefaultValue)

    const getInfoCart = (id_user:string)=>{
        cartController.list().then(res=>{
            userController.getOrderInfo().then(res1=>{
                setStateCart({...stateCart,itemCarts:res.list,cartCount:res.list.length,totalMoney:res.total,order:res1})
            })
        })
    }

    const onChangeQuantity=(id:string,quantityChange:number,price:number)=>{
        const change:OrderProduct={id_order:stateCart.order.id_order,id:id,quantity:quantityChange,price:price}
        cartController.update(change).then(res=>{
            setStateCart({...stateCart,itemCarts:res,cartCount:res.length})
        })
    }

    const onClickDeleteItemCarts=(id:string)=>{
        cartController.delete(id,stateCart.order.id_order).then(res=>{
            setStateCart({...stateCart,itemCarts:res,cartCount:res.length})
        })
    }

    const onClickAddToCart=(id:string,price:number)=>{
        const order_product:OrderProduct={id_order:stateCart.order.id_order,id:id,quantity:1,price:price}
        cartController.add(order_product).then(res=>{
            setStateCart({...stateCart,itemCarts:res,cartCount:res.length})
        })
    }

    const setCartCount = (number:number)=>{
        setStateCart({...stateCart,cartCount:number})
    }


    const data:State={itemCarts:stateCart.itemCarts,
        cartCount:stateCart.cartCount,
        order:stateCart.order,
        totalMoney:stateCart.totalMoney,
        getInfoCart,
        onChangeQuantity,
        onClickDeleteItemCarts,
        onClickAddToCart,
        setCartCount}

    return(
        <CartConText.Provider value={data}>
            {children}
        </CartConText.Provider>
    )
}

export default CartContextProvider