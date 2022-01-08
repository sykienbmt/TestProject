import React, { useContext, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { User } from '../model/User'
import { UserContext } from '../context/UserContext'
import { userController } from '../controller/UserController'


interface Props{
    user:User
}
interface State{
    countItemCart:number
}

export default function Header(props:Props) {

    const userContext = useContext(UserContext)

    const changeStatus=()=>{
        if(userContext.status==="Logout"){
            userContext.changeStatus("Login")
        }
    }
    return (
        <div id="header-container">
            <div id='header-bar'>
                <nav className="menu">
                    <ul className="menuLv1">
                        <li className="itemLv1">
                            <Link to="home" className="titleLv1"> Home</Link>
                        </li>
                        <li className="itemLv1">
                            <Link to="shop" className="titleLv1">Shop</Link>
                            <ul className="menuLv2">
                                <li className="itemLv2"><Link to="products" className="titleLv2">Iphone</Link></li>
                                <li className="itemLv2"><Link to="products" className="titleLv2">SamSung</Link></li>
                                <li className="itemLv2"><Link to="products" className="titleLv2">XiaoMi</Link></li>
                                <i className="fas fa-chevron-up"></i>
                            </ul>
                        </li>
                        <li className="itemLv1">
                            <Link to="home" className="titleLv1">Helps</Link>
                        </li>
                        <li className="itemLv1">
                            <Link to="home" className="titleLv1">Contact</Link>
                        </li>
                    </ul>
                </nav>
                <div className="logo">
                    <Link to="/">
                        <img  src="https://iweb.tatthanh.com.vn/pic/3/blog/images/image(2068).png" alt="" className="logoImg"/>
                    </Link>
                </div>
                <nav className="search-bar">
                    <div className="search-box">
                        <input type="text" className="search-key" />
                        <i className="fas fa-search"></i>
                    </div>
                    <Link to="login" className="menu-login"><p onClick={changeStatus}> {userContext.status}</p></Link>
                    <Link to="admin" className="menu-login">Admin</Link>
                    <div className="menu-register">
                        <Link to="cart" ><i className="fas fa-shopping-bag"></i></Link>
                        <div className="bgr-count">
                            <p className="count-item">
                                {/* {props.countItemCart} */}
                                </p>
                        </div>
                        <Link to="order">
                            <div className="show-customer-order">
                                Your Order
                                <i className="fas fa-chevron-up"></i>
                            </div>
                        </Link>
                    </div>
                    <div className="user-info-show">
                        {/* <p>{props.user.name}</p> */}
                        <p>{userContext.user.name}</p>
                    </div>
                </nav>
            </div>
        </div>
    )
}
