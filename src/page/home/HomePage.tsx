import React from 'react'
import Footer from '../../component/Footer'
import CommentItem from './CommentItem'
import './HomePage.css'
import ItemTop from './ItemTop'
import Offer from './Offer'
import Slider from './Slider'

export default function HomePage() {
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
