import axios from "axios"
import { authAxios } from ".";
import { OrderWithDetailAddress } from "../model/Order";
import { OrderPagination } from "../model/OrderPagination";

class OrderController{

    async update(id_user:string,id_order:string){
        return authAxios.put('http://localhost:3333/order/update',{id_user,id_order})
    }
    
    async list(orderPagination:OrderPagination){
        return authAxios.put('http://localhost:3333/order/list',orderPagination).then(res=>{
            let listOrder:OrderWithDetailAddress[]=res.data.listOrder
            let totalPage:number[]=Array.from({length: res.data.totalPage}, (_, i) => i + 1)
            return {listOrder,totalPage}
        })
    }

}


export const orderController = new OrderController()