import React, { createContext, ReactNode, useState } from "react";
import { authAxios } from "../controller";
import { User } from "../model/User";


interface UserContextProps{
    children: ReactNode
}

const stateDefault={
    user:{address:"",email:"",id_user:"",name:"",phone:""},
    status:"Login",
    changeUser:()=>{},
    changeStatus:()=>{},
}

type State={
    user:User,
    status:string,
    changeUser:(user:User)=>void,
    changeStatus:(status:string)=>void,
}

export const UserContext= createContext<State>(stateDefault)

const UserContextProvider = ({children}:UserContextProps)=>{

    const [stateUser,setStateUser]= useState<State>(stateDefault)

    const changeStatus=(status:string)=>{
        setStateUser({...stateUser,status:status,user:stateDefault.user})
        localStorage.removeItem('accessToken')
        authAxios.defaults.headers.common['Authorization'] = ""
    }

    const changeUser=(user:User)=>{    
        if(user.id_user!==""){
            setStateUser({...stateUser,user:user,status:"Logout"})
        }   
    }

    // const userContextData:State = {
    //     user:stateUser.user,
    //     status:stateUser.status,
    //     changeUser,
    //     changeStatus
    // }
    
    return(
        <UserContext.Provider value={{user:stateUser.user,status:stateUser.status,changeStatus,changeUser}}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider