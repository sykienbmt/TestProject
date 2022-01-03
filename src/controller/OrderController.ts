import axios from "axios"

import { OrderProduct } from "../model/OrderProduct";
import { OrderWithDetailAddress } from "../model/Order";
import { OrderPagination } from "../model/OrderPagination";



class OrderController{

    async addOrder(id_user:string,id_order:string){
        return axios.post('http://localhost:3333/order/add',{id_user,id_order})
    }
    
    async getListOrder(id_user:string){
        return axios.put('http://localhost:3333/order/get',{id_user}).then(res=>{
            return res.data as OrderWithDetailAddress[]
        })
    }
    
    async getListOrderWithPagination(orderPagination:OrderPagination){
        return axios.put('http://localhost:3333/order/getWithPagination',orderPagination).then(res=>{

            let listOrder:OrderWithDetailAddress[]=res.data.listOrder
            let totalPage:number[]=Array.from({length: res.data.totalPage}, (_, i) => i + 1)
            return {listOrder,totalPage}
        })
    }

    // async addToCart(info:any){
    //     return axios.post('http://localhost:3333/cart/add',info)
    // }
}


export const orderController = new OrderController()