import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div id="header-container">
            <div id='header-bar'>
                <nav className="menu">
                    <ul className="menuLv1">
                        <li className="itemLv1">
                            <Link to="home" className="titleLv1"> <li className="itemLv1">Home</li></Link>
                        </li>
                        <li className="itemLv1">
                            <Link to="products" className="titleLv1">Products</Link>
                            <ul className="menuLv2">
                                <li className="itemLv2"><Link to="products" className="titleLv2">Iphone</Link></li>
                                <li className="itemLv2"><Link to="products" className="titleLv2">SamSung</Link></li>
                                <li className="itemLv2"><Link to="products" className="titleLv2">XiaoMi</Link></li>
                            </ul>
                        </li>
                        <li className="itemLv1">
                            <Link to="cart" className="titleLv1">Cart</Link>
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
                    <a href="" className="menu-login">Login</a>
                    <a href="" className="menu-register">Register</a>
                </nav>
            </div>
        </div>
    )
}
