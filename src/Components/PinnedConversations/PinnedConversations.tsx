import React from 'react';
import Image from 'next/image';
import Conv1 from '../../assets/conv1.svg';
import styles from './PinnedConversations.module.css';

interface PinnedConversationsProps {
    pinnedConversations: any[],
    conversationActive: string,
    handleConversationActive: Function,
    search: string,
    showFullSidebar: boolean,
}

const PinnedConversations = ({
    pinnedConversations,
    conversationActive,
    handleConversationActive,
    search,
    showFullSidebar
}: PinnedConversationsProps) => {

    return (
        <>
            {pinnedConversations.length > 0 && (
                <div className={styles.pinnedConversationsWrap}>
                    <h2 className={styles.title}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" /></svg>
                        {showFullSidebar ? "Conversations épinglées" : null}
                    </h2>
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

                                    </div>
                                ) : null
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default PinnedConversations;
