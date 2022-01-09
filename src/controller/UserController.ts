import axios, { AxiosError } from "axios"
import { Order } from "../model/Order";
import { User } from "../model/User";
import { authAxios} from "./index";


class UserController{
    
    async login(email:string,pass:string){
        return axios.put('http://localhost:3333/login',{email,pass}).then(res=>{

            const token = res.data.accessToken;
            localStorage.setItem('accessToken',token)
            
            // setTimeout(()=>{
            //     localStorage.removeItem('accessToken')
            //     alert('Your login is expired pls login again')
            //     window.location.href='/login'
            // },30*1000)

            authAxios.defaults.headers.common['Authorization'] = token
            return parseJwt(token)
        })
    }

    async getOrderInfo(){
        return authAxios.put('http://localhost:3333/user').then(res=>{
            return res.data as Order
        })
    }
    
    async get(id_user:string):Promise<User>{
        return authAxios.put('http://localhost:3333/user/getInfo',{id_user}).then(res=>{
            return res.data
        })
    }

    async getMe(){
        return authAxios.put('http://localhost:3333/getMe').then(res=>{
            return res.data as User
        })
    }
}

const parseJwt =(token:string)=> {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const userController = new UserController()