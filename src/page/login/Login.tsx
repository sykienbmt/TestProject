
import React, { useState } from 'react'
import { userController } from '../../controller/UserController'
import './Login.css'


interface State{
    email:string,
    pass:string
}






export default function Login() {

    const [state,setState]= useState<State>({email:"",pass:""})

    const onClickLogin=(e:any)=>{
        e.preventDefault()
        userController.login(state.email,state.pass).then(res=>{
            alert("done")
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
                        <button className="btn">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
