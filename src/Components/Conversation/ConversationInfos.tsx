import React, { useState } from 'react'
import styles from './style.module.scss'
import { socket } from '@/pages/_app'
import IsTyping from './IsTyping'
import { capitalize } from '@/Functions/Utils/capitalize'


interface ConversationInfosProps {
    _id: string,
    name: string,
    last_message_sender: string,
    last_message_content: string,
    userId: string
}

const ConversationInfos = ({
    _id,
    name,
    last_message_sender,
    last_message_content,
    userId
}: ConversationInfosProps) => {

    const [typingStatus, setTypingStatus] = useState({})

    socket.on('typing', (data) => {
        const prev = typingStatus
        setTypingStatus(() => {
            return {
                ...prev,
                [data.conversationId]: data.typing
            }
        })
    })

    

    return (
        <div
            className={styles.conversationinfos}
        >
            <h4 className={styles.conversationName}>
                {capitalize(name)}
            </h4>
            {
                typingStatus[_id as keyof typeof typingStatus] ?
                    <IsTyping />
                    :
                    <p className={styles.lastMessage}>
                        {last_message_content}
                    </p>
            }
        </div>
    )
}

export default ConversationInfos