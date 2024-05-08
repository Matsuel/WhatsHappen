import React, { MouseEventHandler } from 'react'
import styles from './Conversation.module.css'
import Pinned from '@/assets/Pinned.svg'
import Pin from '@/assets/Pin.svg'
import ShowDate from './ShowDate/ShowDate'
import ConversationStatus from '../../ConversationStatus/ConversationStatus'
import ConversationInfos from './ConversationInfos/ConversationInfos'
import Image from 'next/image'

interface ConversationProps {
    conversation: ConversationInfos,
    handleConversationActive: Function,
    typingStatus: {},
    handlePinnedConversation: Function,
    userId: string
    classActive: string,
    noConvActiveClass: string,
}

const Conversation = ({
    conversation,
    handleConversationActive,
    typingStatus,
    handlePinnedConversation,
    userId,
    classActive,
    noConvActiveClass
}: ConversationProps) => {
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
                src={conversation.pinnedBy.includes(userId) ? Pinned : Pin}
                alt="pinned"
                className={styles.pinned}
                onClick={() => handlePinnedConversation(conversation._id)}
            />

        </div>
    )
}

export default Conversation