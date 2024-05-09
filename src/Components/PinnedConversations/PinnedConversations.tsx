import React, { useState } from 'react';
import Image from 'next/image';
import styles from './PinnedConversations.module.scss';
import ContextMenuPin from './ContextMenuPinned';
import Avatar from '../Avatar/Avatar';

interface PinnedConversationsProps {
    pinnedConversations: ConversationInfos[],
    conversationActive: string,
    handleConversationActive: Function,
    search: string
}

const PinnedConversations = ({
    pinnedConversations,
    conversationActive,
    handleConversationActive,
    search
}: PinnedConversationsProps) => {

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
                                        <ContextMenuPin
                                            conversationId={conversation._id}
                                            points={points}
                                        />
                                    }
                                    <div
                                        className={[styles.pinnedConversation, classActive, noConvActiveClass].join(' ')}
                                        key={conversation._id}
                                        onClick={() => handleConversationActive(conversation._id)}
                                        onContextMenu={(e) => handleContextMenu(e, conversation._id)}
                                    >

                                        {conversation.pic ?
                                            <Image
                                                src={`data:image/jpeg;base64,${conversation.pic}`}
                                                alt="conv1"
                                                className={styles.conversationimage}
                                                width={0}
                                                height={0}
                                            />
                                            :
                                            <Avatar
                                                width={75}
                                                height={75}
                                            />
                                        }

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