import React from 'react'

const Message = ({ message, userId, conv, i, scrollBottomRef }: MessageProps) => {
    return (
        <div className="message" ref={i === conv.messages.length - 1 ? scrollBottomRef : null} >
            <div className={message.sender_id === userId ? 'messagesent' : 'messagereceived'} key={message._id}>
                <p className='messagecontent'>
                    {message.content}
                </p>
                <p className='messagetime'>
                    {new Date(message.date).getHours()}:
                    {Math.round(new Date(message.date).getMinutes() / 10)}{new Date(message.date).getMinutes() % 10}
                </p>
            </div>
        </div>
    )
}

export default Message
