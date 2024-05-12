import React, { useState } from 'react'
import styles from './Conversation.module.scss'
import Pin from '@/assets/Pin.svg'
import ShowDate from '../ShowDate/ShowDate'
import ConversationStatus from './ConversationStatus'
import ConversationInfos from './ConversationInfos'
import Image from 'next/image'
import { socket } from '@/pages/_app'
import { decodeToken } from 'react-jwt'
import ContextConversation from './ContextConversation'

interface ConversationProps {
    conversation: ConversationInfos,
    handleConversationActive: Function,
    typingStatus: {},
    userId: string
    classActive: boolean,
    noConvActiveClass: boolean,
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

    const [contextMenu, setContextMenu] = useState<boolean>(false)
    const [points, setPoints] = useState({ x: 0, y: 0 })
    const [conversationPinned, setConversationPinned] = useState<string>("")

    const handleContextMenu = (e: { preventDefault: () => void; pageX: any; pageY: any; }, conversationId: string) => {
        e.preventDefault()
        let newConversationPinned = conversationPinned
        if (newConversationPinned === conversationId) {
            newConversationPinned = ""
            setContextMenu(false)
        } else {
            newConversationPinned = conversationId
            setContextMenu(true)
            setPoints({ x: e.pageX, y: e.pageY })
        }
        setConversationPinned(newConversationPinned)
    }

    return (
        <div
            className={[
                styles.conversation,
                classActive && styles.conversationActive,
                noConvActiveClass && styles.noActiveClass
            ].join(" ")}
            key={conversation._id}
            onContextMenu={(e) => handleContextMenu(e, conversation._id)}
        >

            {
                contextMenu && conversationPinned === conversation._id &&
                <ContextConversation
                    conversationId={conversation._id}
                    points={points}
                />
            }


            <ConversationStatus
                _id={conversation._id}
                pic={conversation.pic}
                status={conversation.status}
                handleConversationActive={handleConversationActive}
            />

            <div className={styles.infos}>

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

                {/* Context Menu à ajouter ici */}

            </div>

        </div>
    )
}

export default Conversation