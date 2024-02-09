import React from 'react'
import MessagePrivacy from '../MessagePrivacy/MessagePrivacy'
import Message from './Message/Message'

const MessagesArea = ({ conv, userId, scrollBottomRef }: MessagesAreaProps) => {
    return (
        <div className="messagesection">
            <MessagePrivacy />

            {conv.messages.map((message, i) => {
                return (
                    <Message 
                        message={message} 
                        userId={userId} 
                        conv={conv} 
                        i={i} 
                        scrollBottomRef={scrollBottomRef} 
                        key={message._id}
                    />
                )
            })}
        </div>
    )
}

export default MessagesArea
