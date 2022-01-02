import axios from "axios"
import { ItemCart } from "../model/ItemCart";
import { Order_product } from "../model/Order_product";



class CartController{

    async getInfoCart(id_order:string):Promise<ItemCart[]>{
        return axios.put('http://localhost:3333/cart',{id_order:id_order}).then(res=>{
            return res.data
        })
    }
    
    async addToCart(order_product:Order_product):Promise<number>{
        return axios.put('http://localhost:3333/cart/add',order_product).then(res=>{
            return res.data;
        })
    }

    async updateQuantity(order_product:Order_product):Promise<Order_product[]>{
        return axios.put('http://localhost:3333/cart/update',order_product).then(res=>{
            return res.data;
        })
    }

    async getTotalPrice(id_order:string):Promise<number>{
        return axios.put('http://localhost:3333/cart/total',{id_order}).then(res=>{
            console.log(res.data);
            
            return res.data;
        })
    }

    async deleteFromCart(info:Order_product){
        return axios.put(`http://localhost:3333/cart/delete`,info) .then(res=>{
            return res.data;
        })
    }

}


export const cartController = new CartController()