import React from 'react'

interface Props{
    message:string
}
export default function PopupMessage(props:Props) {
    return (
        <div className="popup-message">
              {props.message}
        </div>
    )
}
