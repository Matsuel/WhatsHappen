import React, { useState } from 'react'
import styles from './Conversation.module.scss'
import ShowDate from '../ShowDate/ShowDate'
import ConversationStatus from './ConversationStatus'
import ConversationInfos from './ConversationInfos'
import { decodeToken } from 'react-jwt'
import ContextMenuConversation from '../ContextMenuConversation/ContextMenuConversation'
import Image from 'next/image'
import Delete from '@/assets/Delete.svg'

interface ConversationProps {
    conversation: ConversationInfos,
    handleConversationActive: Function,
    userId: string
    classActive: boolean,
    noConvActiveClass: boolean,
    editConversation: boolean
}

const Conversation = ({
    conversation,
    handleConversationActive,
    userId,
    classActive,
    noConvActiveClass,
    editConversation
}: ConversationProps) => {

    const [contextMenu, setContextMenu] = useState<boolean>(false)
    const [points, setPoints] = useState({ x: 0, y: 0 })
    const [conversationPinned, setConversationPinned] = useState<string>("")
    const [hover, setHover] = useState<boolean>(false)

    let cookies = ""
    if (typeof window !== 'undefined') {
        cookies = localStorage.getItem('user') || ''
        const token: User | null = decodeToken(cookies)
        userId = token?.userId as string
    }

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
            onClick={() => handleConversationActive(conversation._id)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >

            {editConversation && <Image
                src={Delete}
                alt="Delete"
                width={35}
                height={35}
                className={styles.delete}
                onClick={(e) => {
                    e.stopPropagation()
                }}
            />}


            {
                contextMenu && conversationPinned === conversation._id &&
                <ContextMenuConversation
                    conversationId={conversation._id}
                    points={points}
                    setContextMenu={setContextMenu}
                    setConversationPinned={setConversationPinned}
                    pin={false}
                />
            }


            <ConversationStatus
                _id={conversation._id}
                pic={conversation.pic}
                status={conversation.status}
            />

            <div className={styles.infos}>

                <ConversationInfos
                    _id={conversation._id}
                    name={conversation.name}
                    last_message_sender={conversation.last_message_sender}
                    last_message_content={conversation.last_message_content}
                    userId={userId}
                />

                <ShowDate
                    date={conversation.last_message_date}
                    color={hover || classActive ? "#FFFFFF" : "#000000"}
                />

            </div>

        </div>
    )
}

export default Conversation