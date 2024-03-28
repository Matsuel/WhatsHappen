import React, { useState } from 'react'
import MessagePrivacy from './MessagePrivacy/MessagePrivacy'
import Message from './MessagesList/Message/Message'
import styles from './MessagesArea.module.css'
import MessageDate from './MessagesList/MessageDate/MessageDate'
import MessageFile from './MessagesList/MessageFile/MessageFile'
import MessagesList from './MessagesList/MessagesList'

interface MessagesAreaProps {
    userId: string,
    showSearchConv: boolean,
    messagesCount: number,
    messages: message[],
    filesEmpty: boolean,
    deleteMessage: Function,
    handleReaction: Function,
}

const MessagesArea = ({ userId, showSearchConv, messages, messagesCount, filesEmpty, deleteMessage, handleReaction }: MessagesAreaProps) => {
    const [messageDay, setMessageDay] = useState<Number>(0)

    return (
        // <div className={`messagesection ${showSearchConv ? "messagesectionmedium" : "messagesectionfull"} ${filesEmpty ? "messagesectionheightMax" : "messagesectionheightMin"} `}>
        <div className={styles.messagesection + " " + (showSearchConv ? styles.messagesectionmedium : styles.messagesectionfull) + " " + (filesEmpty ? styles.messagesectionheightMax : styles.messagesectionheightMin)}>
            <MessagePrivacy />


            {/* Composant MessageDate  ajouter la condition dans le composant  */}
            {
                messageDay === 0 && messages.length > 0 ?
                    <MessageDate message={messages[0]} />
                    : null
            }

            <MessagesList
                userId={userId}
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
