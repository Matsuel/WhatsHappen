import React, { useState } from 'react'
import MessagePrivacy from '../../MessagePrivacy/MessagePrivacy'
import styles from './MessagesArea.module.css'
import MessageDate from '../../MessageDate/MessageDate'
import MessagesList from './MessagesList/MessagesList'

interface MessagesAreaProps {
    showSearchConv: boolean,
    messagesCount: number,
    messages: message[],
    filesEmpty: boolean,
    deleteMessage: Function,
    handleReaction: Function,
}

const MessagesArea = ({ showSearchConv, messages, messagesCount, filesEmpty, deleteMessage, handleReaction }: MessagesAreaProps) => {
    const [messageDay, setMessageDay] = useState<Number>(0)

    return (
        <div className={styles.messagesection + " " + (showSearchConv ? styles.messagesectionmedium : styles.messagesectionfull) + " " + (filesEmpty ? styles.messagesectionheightMax : styles.messagesectionheightMin)}>
            <MessagePrivacy />

            {
                messageDay === 0 && messages.length > 0 ?
                    <MessageDate message={messages[0]} />
                    : null
            }

            <MessagesList
                messagesCount={messagesCount}
                messages={messages}
                deleteMessage={deleteMessage}
                handleReaction={handleReaction}
            />
        </div>
    )
}

export default MessagesArea
