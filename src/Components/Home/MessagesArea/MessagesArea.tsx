import React from 'react'
import MessagePrivacy from '../MessagePrivacy/MessagePrivacy'
import Message from './Message/Message'

const MessagesArea = ({ conv, userId, scrollBottomRef, showSearchConv }: MessagesAreaProps) => {
    return (
        <div className={`messagesection ${showSearchConv ? "messagesectionmedium": "messagesectionfull"}`}>
            <MessagePrivacy />

            {conv.messages.map((message, i) => {
                const nextMessage = i < conv.messages.length - 1 ? conv.messages[i + 1] : null
                const previousMessage = i > 0 ? conv.messages[i - 1] : null

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
                        conv={conv} 
                        i={i} 
                        scrollBottomRef={scrollBottomRef} 
                        key={message._id}
                        topRounded={topRounded}
                        bottomRounded={bottomRounded}
                    />
                )
            })}
        </div>
    )
}

export default MessagesArea
