import axios from "axios"
import { Order } from "../model/Order";
import { User } from "../model/User";


class UserController{

    async getUser(id_user:string){
        let info={id_user:id_user}
        return axios.put('http://localhost:3333/user',info).then(res=>{
            return res.data.order as Order
        })
    }
    
    async getUserInfo(id_user:string):Promise<User>{
        return axios.put('http://localhost:3333/user/getInfo',{id_user}).then(res=>{
            return res.data
        })
    }
}


export const userController = new UserController()