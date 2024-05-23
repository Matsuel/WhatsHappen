import React, { useState } from 'react';
import styles from './style.module.scss';
import ContextMenuConversation from '../ContextMenuConversation/ContextMenuConversation';
import DisplayAvatar from '../DisplayAvatar/DisplayAvatar';
import { socket } from '@/pages/_app';
import { useCookie } from '@/hooks/useCookie/useCookie';

interface PinnedConversationsProps {
    pinnedConversations: ConversationInfos[],
    conversationActive: string,
    setConversationActive: Function,
    search: string
}

const PinnedConversations = ({
    pinnedConversations,
    conversationActive,
    setConversationActive,
    search
}: PinnedConversationsProps) => {

    const { cookies } = useCookie()

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

    const handleConversationActive = (conversationId: string) => {
        if (conversationId === conversationActive) {
            setConversationActive('')
            return
        }
        setConversationActive(conversationId)
        socket.emit('conversationmessages', { cookies, conversation_id:conversationId })
    }

    return (
        <>

            {pinnedConversations.length > 0 && (
                <div className={styles.pinnedConversations}>

                    {pinnedConversations.map((conversation) => {

                        const classActive = conversation._id === conversationActive ? styles.pinnedConversationActive : ''

                        const noConvActiveClass = conversationActive === "" ? styles.noActiveClass : ''

                        return (
                            conversation.name.toLowerCase().includes(search.toLowerCase()) ? (
                                <>
                                    {
                                        contextMenu && conversationPinned === conversation._id &&
                                        <ContextMenuConversation
                                            conversationId={conversation._id}
                                            points={points}
                                            setContextMenu={setContextMenu}
                                            setConversationPinned={setConversationPinned}
                                            pin={true}
                                        />
                                    }
                                    <div
                                        className={[styles.pinnedConversation, classActive, noConvActiveClass].join(' ')}
                                        key={conversation._id}
                                        onClick={() => handleConversationActive(conversation._id)}
                                        onContextMenu={(e) => handleContextMenu(e, conversation._id)}
                                        role='button'
                                        tabIndex={0}
                                    >

                                        <DisplayAvatar pic={conversation.pic} size={75} />

                                        <h3 className={styles.conversationname}>
                                            {conversation.name.charAt(0).toUpperCase() + conversation.name.slice(1)}
                                        </h3>

                                    </div>
                                </>
                            ) : null
                        )
                    })}
                </div>
            )}
        </>
    );
};

export default PinnedConversations;