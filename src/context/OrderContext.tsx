import React from "react";
import { createContext, ReactNode, useState } from "react";
import { Order } from "../model/Order";


interface OrderContextProps{
    children: ReactNode
}

type State={
    order:Order,
    changeOrder:(order:Order)=>void
}

const defaultState={
    order:{id_order:"",id_user:"",total:0,is_temporary:false,timeOrder:""},
    changeOrder:()=>{}
}

export const OrderContext=createContext<State>(defaultState)

const OrderContextProvider = ({children}:OrderContextProps)=>{
    const [stateOrder,setStateOrder]= useState<State>(defaultState)

    const changeOrder=(order:Order)=>{setStateOrder({...stateOrder,order:order})}
    // const orderContextData = {order:stateOrder.order,changeOrder}

    return(
        <OrderContext.Provider value={{order:stateOrder.order,changeOrder}}>
            {children}
        </OrderContext.Provider>
    )

}

export default OrderContextProvider