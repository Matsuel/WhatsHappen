import React, { useState } from 'react';
import Image from 'next/image';
import Conv1 from '../../assets/conv1.svg';
import styles from './PinnedConversations.module.css';
import Pinned from '../../assets/Pinned.svg';
import Bin from '../../assets/Bin.svg';
import { socket } from '@/pages/_app';
import { decodeToken } from 'react-jwt';
import ContextMenuPin from './ContextMenuPinned';

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
        console.log('context menu', e.pageX, e.pageY)
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

                                        <Image
                                            src={conversation.pic ? `data:image/jpeg;base64,${conversation.pic}` : Conv1}
                                            alt="conv1"
                                            className={styles.conversationimage}
                                            width={0}
                                            height={0}
                                        />

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