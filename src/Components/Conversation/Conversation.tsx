import React from 'react'
import styles from './Conversation.module.css'
import Pin from '@/assets/Pin.svg'
import ShowDate from '../ShowDate/ShowDate'
import ConversationStatus from './ConversationStatus'
import ConversationInfos from './ConversationInfos'
import Image from 'next/image'
import { socket } from '@/pages/_app'
import { decodeToken } from 'react-jwt'

interface ConversationProps {
    conversation: ConversationInfos,
    handleConversationActive: Function,
    typingStatus: {},
    userId: string
    classActive: string,
    noConvActiveClass: string,
}

const Conversation = ({
    conversation,
    handleConversationActive,
    typingStatus,
    userId,
    classActive,
    noConvActiveClass
}: ConversationProps) => {

    let cookies = ""
    if (typeof window !== 'undefined') {
        cookies = localStorage.getItem('user') || ''
        const token: User | null = decodeToken(cookies)
        userId = token?.userId as string
    }

    // Mettre ça dans un dossier Functions
    const handlePinnedConversation = (conversation_id: string) => {
        socket.emit('pinconversation', { cookies, conversation_id })
    }
    
    return (
        <div
            className={styles.conversation + " " + classActive + " " + noConvActiveClass}
            key={conversation._id}
        >

            <ConversationStatus
                _id={conversation._id}
                pic={conversation.pic}
                status={conversation.status}
                handleConversationActive={handleConversationActive}
            />

            <ConversationInfos
                _id={conversation._id}
                name={conversation.name}
                last_message_sender={conversation.last_message_sender}
                last_message_content={conversation.last_message_content}
                typingStatus={typingStatus}
                userId={userId}
                handleConversationActive={handleConversationActive}
            />

            <ShowDate
                date={conversation.last_message_date}
            />

            <Image
                src={Pin}
                alt="pinned"
                className={styles.pinned}
                onClick={() => handlePinnedConversation(conversation._id)}
            />

        </div>
    )
}

export default Conversation