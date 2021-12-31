import axios from "axios"
import { OrderTest } from "../model/OrderTest";
import { Order_product } from "../model/Order_product";



class OrderController{

    async addOrder(info:OrderTest){
        return axios.post('http://localhost:3333/order/add',info)
    }
    
    async get(){
        return axios.get('http://localhost:3333/order/get').then(res=>{
            return res.data as OrderTest[]
        })
    }

    async addToCart(cartInfo:Order_product){
        return axios.post('http://localhost:3333/cart/add',cartInfo)
    }
}


export const orderController = new OrderController()