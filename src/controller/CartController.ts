import axios from "axios"
import { ItemCart } from "../model/Product"
import { OrderProduct } from "../model/OrderProduct";



class CartController{

    async list(id_order:string){
        return axios.put('http://localhost:3333/cart',{id_order:id_order}).then(res=>{
            let total=0
            let list:ItemCart[]= res.data
            list.forEach(item => {
                total+= item.price*item.quantity
            });
            return {list,total}
        })
    }
    
    async add(order_product:OrderProduct):Promise<number>{
        return axios.put('http://localhost:3333/cart/add',order_product).then(res=>{
            return res.data;
        })
    }

    async update(order_product:OrderProduct):Promise<OrderProduct[]>{
        return axios.put('http://localhost:3333/cart/update',order_product).then(res=>{
            return res.data;
        })
    }

    async delete(info:OrderProduct){
        return axios.put(`http://localhost:3333/cart/delete`,info) .then(res=>{
            return res.data;
        })
    }

}


export const cartController = new CartController()