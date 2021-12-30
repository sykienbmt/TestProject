import axios from "axios"
import { OrderTest } from "../model/OrderTest";



class OrderController{

    async addOrder(info:OrderTest){
        return axios.post('http://localhost:3333/order/add',info)
    }
    
    async get(){
        return axios.get('http://localhost:3333/order/get').then(res=>{
            console.log(res.data);
            
            return res.data as OrderTest[]
        })
    }
}


export const orderController = new OrderController()