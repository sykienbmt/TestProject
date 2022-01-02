import axios from "axios"
import { OrderTest } from "../model/OrderTest";
import { Order_product } from "../model/Order_product";



class OrderController{

    async addOrder(id_user:string,id_order:string){
        return axios.post('http://localhost:3333/order/add',{id_user,id_order})
    }
    
    async get(){
        return axios.get('http://localhost:3333/order/get').then(res=>{
            return res.data as OrderTest[]
        })
    }

    // async addToCart(info:any){
    //     return axios.post('http://localhost:3333/cart/add',info)
    // }
}


export const orderController = new OrderController()