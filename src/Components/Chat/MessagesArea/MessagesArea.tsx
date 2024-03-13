import React, { useState } from 'react'
import MessagePrivacy from './MessagePrivacy/MessagePrivacy'
import Message from './MessagesList/Message/Message'
import './MessagesArea.css'
import MessageDate from './MessagesList/MessageDate/MessageDate'
import MessageFile from './MessagesList/MessageFile/MessageFile'
import MessagesList from './MessagesList/MessagesList'

const MessagesArea = ({ userId, scrollBottomRef, showSearchConv, messages, messagesCount, filesEmpty, deleteMessage, handleReaction }: MessagesAreaProps) => {
    const [messageDay, setMessageDay] = useState<Number>(0)

    return (
        <div className={`messagesection ${showSearchConv ? "messagesectionmedium" : "messagesectionfull"} ${filesEmpty ? "messagesectionheightMax" : "messagesectionheightMin"} `}>
            <MessagePrivacy />


            {/* Composant MessageDate  ajouter la condition dans le composant  */}
            {
                messageDay === 0 && messages.length > 0 ?
                    <MessageDate message={messages[0]} />
                    : null
            }

            <MessagesList
                userId={userId}
                scrollBottomRef={scrollBottomRef}
                showSearchConv={showSearchConv}
                messagesCount={messagesCount}
                messages={messages}
                deleteMessage={deleteMessage}
                handleReaction={handleReaction}
            />
        </div>
    )
}

export default MessagesArea
