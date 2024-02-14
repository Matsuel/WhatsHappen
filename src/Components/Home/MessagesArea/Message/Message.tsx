import React from 'react'

import './Message.css'

const Message = ({ message, userId, i, scrollBottomRef ,bottomRounded ,topRounded, messagesCount }: MessageProps) => {

    const isReceived = message.sender_id !== userId

    const messageClass = isReceived ? 'messagereceived' : 'messagesent'
    const topClass = isReceived ? (topRounded ? 'messagereceivedtop' : 'messagereceivedmiddle') : (topRounded ? 'messagesenttop' : 'messagesentmiddle');
    const bottomClass = isReceived ? (bottomRounded ? 'messagereceivedbottom' : '') : (bottomRounded ? 'messagesentbottom' : '');

    return (
        <div className="message" ref={i === messagesCount - 1 ? scrollBottomRef : null} >
            <div className={`${messageClass} ${topClass} ${bottomClass}`} key={message._id}>
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
