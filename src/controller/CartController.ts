import axios from "axios"
import { Order } from "../model/Order";
import { Order_product } from "../model/Order_product";



class CartController{

    async getCart(info:string):Promise<Order>{
        return axios.post('http://localhost:3333/Cart',info).then(res=>{
            return res.data
        })
    }
    
    async addToCart(item:Order_product):Promise<Order_product[]>{
        return axios.put('http://localhost:3333/cart/add',item).then(res=>{
            return res.data;
        })
    }

    async updateQuantity(order_product:Order_product):Promise<Order_product[]>{
        return axios.put('http://localhost:3333/cart/update',order_product).then(res=>{
            return res.data;
        })
    }

    async deleteFromCart(id:String){
        return axios.get(`http://localhost:3333/cart/delete/${id}`) .then(res=>{
            return res.data;
        })
    }

}


export const cartController = new CartController()