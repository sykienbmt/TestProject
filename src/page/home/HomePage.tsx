import React from 'react'
import CommentItem from './CommentItem'
import './HomePage.css'
import Offer from './Offer'
import Slider from './Slider'

export default function HomePage() {
    return (
        <div id="home-container">
            <Slider/>
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
    )
}
