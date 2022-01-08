import React, { useContext, useEffect } from 'react'
import Footer from '../../component/Footer'
import { OrderContext } from '../../context/OrderContext'
import { userController } from '../../controller/UserController'
import { User } from '../../model/User'
import CommentItem from './CommentItem'
import './HomePage.css'
import ItemTop from './ItemTop'
import Offer from './Offer'
import Slider from './Slider'

interface Props{
    setUserInfo:(user:User)=>void
}

export default function HomePage(props:Props) {

    // if(localStorage.getItem('accessToken')){
    //     userController.getMe().then(res=>{
    //         props.setUserInfo(res)
    //     })
    // }
    

    return (
        <>
        <div id="home-container">
            <Slider/>
            <section id="feature-product-container">
                <div className="feature-product">
                    <h1 className="feature-product-title">Feature Product</h1>

                    <div className="top-3-product">
                        <ItemTop/>
                        <ItemTop/>
                        <ItemTop/>
                    </div>
                </div>
            </section>
            <Offer/>

            <section id="comment-container">
                <div className="comment">
                    <div className="comment-row">
                        <CommentItem />
                        <CommentItem />
                        <CommentItem />
                    </div>
                </div>
            </section>
        </div>
        <Footer/>
        </>
    )
}
