import React from 'react'
import './CommentItem.css'

export default function CommentItem() {
    return (
        <div className="comment-item">
            <p className="comment-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt ullam nesciunt quasi assumenda perspiciatis nam fuga sit nisi, nobis cum!</p>
            <div className="comment-img">
                <img src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg" alt="" />
            </div>
            <h3 className="comment-name">Jonathan David</h3>
        </div>
    )
}
