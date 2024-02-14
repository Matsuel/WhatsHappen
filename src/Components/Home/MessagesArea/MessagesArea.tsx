import React from 'react'
import MessagePrivacy from '../MessagePrivacy/MessagePrivacy'
import Message from './Message/Message'

import './MessagesArea.css'

const MessagesArea = ({  userId, scrollBottomRef, showSearchConv, messages, messagesCount }: MessagesAreaProps) => {
    return (
        <div className={`messagesection ${showSearchConv ? "messagesectionmedium": "messagesectionfull"}`}>
            <MessagePrivacy />

            {messages.map((message, i) => {
                const nextMessage = i < messagesCount - 1 ? messages[i + 1] : null
                const previousMessage = i > 0 ? messages[i - 1] : null

                let topRounded = true
                let bottomRounded = true

                if (nextMessage && message.sender_id === nextMessage.sender_id) {
                    bottomRounded = false
                }

                if (previousMessage && message.sender_id === previousMessage.sender_id) {
                    topRounded = false
                }


                return (
                    <Message 
                        message={message} 
                        userId={userId} 
                        // conv={conv} 
                        i={i} 
                        scrollBottomRef={scrollBottomRef} 
                        key={message._id}
                        topRounded={topRounded}
                        bottomRounded={bottomRounded}
                        messagesCount={messagesCount}
                    />
                )
            })}
        </div>
    )
}

export default MessagesArea
