import axios, { AxiosError } from "axios"
import { Order } from "../model/Order";
import { User } from "../model/User";
import { authAxios} from "./index";

class UserController{
    
    async login(email:string,pass:string){
        return axios.put('http://localhost:3333/login',{email,pass}).then(res=>{
            const token = res.data.accessToken; 
            localStorage.setItem('accessToken',token)
            authAxios.defaults.headers.common['Authorization'] = token
            return res.data
        })
    }

    async getUser(id_user:string){
        let info={id_user:id_user}
        return authAxios.put('http://localhost:3333/user',info).then(res=>{
            // if(res.data.statusCode===401 || res.data.statusCode===403){
            //     window.location.href='/login'
            // }
            return res.data.order as Order
        })
    }
    
    async get(id_user:string):Promise<User>{
        return authAxios.put('http://localhost:3333/user/getInfo',{id_user}).then(res=>{
            return res.data
        })
    }
}

export const userController = new UserController()