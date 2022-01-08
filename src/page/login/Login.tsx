
import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { OrderContext } from '../../context/OrderContext'
import { UserContext } from '../../context/UserContext'
import { userController } from '../../controller/UserController'
import { User } from '../../model/User'
import './Login.css'


interface State{
    email:string,
    pass:string
}
interface Props{
    setUserInfo:(user:User)=>void,
    user:User
}

export default function Login(props:Props) {

    const [state,setState]= useState<State>({email:"",pass:""})
    const {order,changeOrder}=useContext(OrderContext)
    const userContext=useContext(UserContext)

    let navigate = useNavigate();

    const onClickLogin=(e:any)=>{
        console.log(userContext.status);
        e.preventDefault()
        userController.login(state.email,state.pass).then(res=>{
            userController.getOrderInfo(res.id_user).then(res=>{
                changeOrder(res)
                navigate('/shop');
            })
        })
    }
    
    return (
        <div id='login-page-container'>
            <div className="login-page">
                <div className="login-image">
                    <img src="" alt="" />
                </div>
                <form className="login-form" onSubmit={e=>onClickLogin(e)}>
                    <h1>LOGIN</h1>
                    <label htmlFor="">Email</label>
                    <input type="text" className="login-email" onChange={e=>setState({...state,email:e.target.value})} />
                    <label htmlFor="">Pass</label>
                    <input type="password" className="login-pass" onChange={e=>setState({...state,pass:e.target.value})}/>
                    <div className='btn-login'>
                        <button className="btn btn-login-1">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

