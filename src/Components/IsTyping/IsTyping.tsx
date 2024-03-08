import React from 'react'
import './IsTyping.css'

const IsTyping = ({ conversationActive, typingStatus, name }: IsTypingProps) => {
  return (
    <>
    {
        typingStatus[conversationActive as keyof typeof typingStatus] ? (
            <div className="typingstatus">
                <p>{name.charAt(0).toUpperCase() + name.slice(1)} est en train d'écrire</p>
            </div>
        ) : (
            null
        )

    }
    </>
  )
}

export default IsTyping