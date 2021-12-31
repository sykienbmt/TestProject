import axios from "axios"
import { Order } from "../model/Order";


class UserController{

    async getUser(id_user:string){
        let info={id_user:id_user}
        return axios.put('http://localhost:3333/user',info).then(res=>{
            return res.data.order as Order
        })
    }
    
    // async get(){
    //     return axios.get('http://localhost:3333/order/get').then(res=>{
    //         console.log(res.data);
            
    //         return res.data as OrderTest[]
    //     })
    // }

    // async addToCart(cartInfo:Order_product){
    //     return axios.post('http://localhost:3333/cart/add',cartInfo)
    // }
}


export const userController = new UserController()