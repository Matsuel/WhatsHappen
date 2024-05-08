import React from 'react';
import Image from 'next/image';
import Conv1 from '../../assets/conv1.svg';
import styles from './PinnedConversations.module.css';

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

    return (
        <>
            {pinnedConversations.length > 0 && (
                <div className={styles.pinnedConversations}>
                    {pinnedConversations.map((conversation) => {

                        const classActive = conversation._id === conversationActive ? styles.pinnedConversationActive : ''

                        const noConvActiveClass = conversationActive === "" ? styles.noActiveClass : ''

                        return (
                            conversation.name.toLowerCase().includes(search.toLowerCase()) ? (
                                <div
                                    className={[styles.pinnedConversation, classActive, noConvActiveClass].join(' ')}
                                    key={conversation._id}
                                    onClick={() => handleConversationActive(conversation._id)}
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
                            ) : null
                        )
                    })}
                </div>
            )}
        </>
    );
};

export default PinnedConversations;
