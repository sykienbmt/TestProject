import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { Order } from "../model/Order";

export type UserState = {
    order:Order,
    changeOrder:(order:Order)=>void
}

const userDefault:UserState={
    order: {id_order:"",id_user:"9999",total:0,is_temporary:true,timeOrder:"123"},
    changeOrder:()=>{}
}

export const userContext = createContext<UserState>(userDefault);

const UserProvider: FC = ({ children }) => {
    const [order, setOrder] = useState<Order>(userDefault.order);
  
    const changeOrder=(order:Order)=>{
        setOrder(order)
    }
  
    return (
        <userContext.Provider value={{order,changeOrder}}>
            {children}
        </userContext.Provider>
    );
  };
  
  export default UserProvider;