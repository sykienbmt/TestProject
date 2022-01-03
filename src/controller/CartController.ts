import axios from "axios"
import { ItemCart } from "../model/ItemCart";
import { OrderProduct } from "../model/OrderProduct";



class CartController{

    async getInfoCart(id_order:string){
        return axios.put('http://localhost:3333/cart',{id_order:id_order}).then(res=>{
            let total=0
            let list:ItemCart[]= res.data
            list.forEach(item => {
                total+= item.price*item.quantity
            });

            return {list,total}
        })
    }
    
    async addToCart(order_product:OrderProduct):Promise<number>{
        return axios.put('http://localhost:3333/cart/add',order_product).then(res=>{
            return res.data;
        })
    }

    async updateQuantity(order_product:OrderProduct):Promise<OrderProduct[]>{
        return axios.put('http://localhost:3333/cart/update',order_product).then(res=>{
            return res.data;
        })
    }

    async getTotalPrice(id_order:string):Promise<number>{
        return await axios.put('http://localhost:3333/cart/total',{id_order}).then(res=>{
            console.log(res.data);
            return res.data;
        })
    }

    async deleteFromCart(info:OrderProduct){
        return axios.put(`http://localhost:3333/cart/delete`,info) .then(res=>{
            return res.data;
        })
    }

}


export const cartController = new CartController()