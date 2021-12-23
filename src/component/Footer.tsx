import "./Footer.css"
import React from 'react'

export default function Footer() {
    return (
        <div id="footer-container"> 
            <div className="footer-content">
            <div className="about-us">
                <h3 className="about-us title">Về chúng tôi</h3>
                <p className="about-us desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam odio repudiandae suscipit iusto ad nostrum similique recusandae vitae magni? Tempora.</p>
            </div>
            <div className="address">
                <h3 className="address-title">Chi nhánh chúng tôi</h3>
                <ul className="address-title">
                    <li className="address-info">
                        <p>Địa chỉ 1</p>
                    </li>
                    <li className="address-info">
                        <p>Địa chỉ 2</p>
                    </li>
                    <li className="address-info">
                        <p>Địa chỉ 3</p>
                    </li>
                </ul>
            </div>
            <div className="menu-footer">
                <h3 className="menu-footer-title">Menu</h3>
                <ul className="menu-footer-title">
                    <li className="item-menu-footer">
                        <a href="">Home</a>
                    </li>
                    <li className="item-menu-footer">
                        <a href="">Products</a>
                    </li>       
                    <li className="item-menu-footer">
                        <a href="">About us</a>
                    </li>
                    <li className="item-menu-footer">
                        <a href="">Contact</a>
                    </li>
                </ul>
            </div>

            <div className="contact-footer">
                <h3 className="contact-footer-title">Contact Us</h3>
                <div className="send-info">
                    <input type="text" placeholder="Email" className="email-contact"/>
                    <i className="fas fa-paper-plane"></i>
                </div>
            </div>
            </div>
        </div>
    )
}
