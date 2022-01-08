import axios from "axios"
import { ItemCart } from "../model/Product"
import { OrderProduct } from "../model/OrderProduct";
import { authAxios } from ".";


class CartController{

    async list(id_user:string){
        return authAxios.put('http://localhost:3333/cart',{id_user:id_user}).then(res=>{
            let total=0
            let list:ItemCart[]= res.data
            list.forEach(item => {
                total+= item.price*item.quantity
            });
            return {list,total}
        })
    }
    
    async add(order_product:OrderProduct):Promise<number>{
        return authAxios.put('http://localhost:3333/cart/add',order_product).then(res=>{
            return res.data;
        })
    }

    async update(order_product:OrderProduct):Promise<ItemCart[]>{
        return authAxios.put('http://localhost:3333/cart/update',order_product).then(res=>{
            return res.data;
        })
    }

    async delete(id:string,id_order:string):Promise<ItemCart[]>{
        return axios.put(`http://localhost:3333/cart/delete`,{id,id_order}) .then(res=>{
            return res.data;
        })
    }

}


export const cartController = new CartController()