import React, {useState} from 'react'
import MessagePrivacy from '../MessagePrivacy/MessagePrivacy'
import Message from './Message/Message'

import './MessagesArea.css'
import MessageDate from './MessageDate/MessageDate'

const MessagesArea = ({  userId, scrollBottomRef, showSearchConv, messages, messagesCount, filesEmpty }: MessagesAreaProps) => {
    const [messageDay, setMessageDay] = useState<Number>(0)

    return (
        <div className={`messagesection ${showSearchConv ? "messagesectionmedium": "messagesectionfull"} ${filesEmpty? "messagesectionheightMax": "messagesectionheightMin"} `}>
            <MessagePrivacy />

            {
                messageDay === 0 && messages.length > 0 ?
                <MessageDate message={messages[0]} />
                : null
            }

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
                    <>
                    {
                        previousMessage && new Date(message.date).toDateString() !== new Date(previousMessage?.date).toDateString() ?
                        (
                            <MessageDate message={message} />
                        ) : null
                        
                    }
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
                    </>
                )
            })}
        </div>
    )
}

export default MessagesArea
