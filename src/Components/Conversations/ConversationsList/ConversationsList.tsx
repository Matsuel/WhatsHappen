import React from 'react'
import styles from './ConversationsList.module.css'
import NoResult from '../NoResult/NoResult'
import Conversation from '../Conversation/Conversation'

const ConversationsList = ({ conversations, conversationActive, handleConversationActive, handleHoverConv, handleHoverConvReset, search, typingStatus, handlePinnedConversation, userId, typeConv, hasMatchingConversations }: ConversationListProps) => {

    const conversationsNoResult: string[] = ["Aucune conversation trouvée", "Aucun groupe n'a été trouvé", "Aucun contact n'a été trouvé"]

    const pinnedByMe = conversations.filter((conv) => conv.pinnedBy.includes(userId))
    const notPinnedByMe = conversations.filter((conv) => !conv.pinnedBy.includes(userId))

    return (
        <div className={styles.convslist}>
            {
                pinnedByMe.length > 0  && typeConv === 1 && hasMatchingConversations ? (
                    <>
                        <h2 className={styles.title}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 48 48"><path fill="" stroke="" stroke-linejoin="round" stroke-width="4" d="M10.6963 17.5042C13.3347 14.8657 16.4701 14.9387 19.8781 16.8076L32.62 9.74509L31.8989 4.78683L43.2126 16.1005L38.2656 15.3907L31.1918 28.1214C32.9752 31.7589 33.1337 34.6647 30.4953 37.3032C30.4953 37.3032 26.235 33.0429 22.7171 29.525L6.44305 41.5564L18.4382 25.2461C14.9202 21.7281 10.6963 17.5042 10.6963 17.5042Z"/></svg>
                            Pin
                        </h2>
                        {pinnedByMe.map((conversation) => {

                            const classActive = conversation._id === conversationActive ? styles.conversationActive : ''

                            const noConvActiveClass = conversationActive === "" ? styles.noActiveClass : ''

                            return (
                                conversation.name.toLowerCase().includes(search.toLowerCase()) ? (
                                    <Conversation
                                        conversation={conversation}
                                        handleConversationActive={handleConversationActive}
                                        handleHoverConv={handleHoverConv}
                                        handleHoverConvReset={handleHoverConvReset}
                                        typingStatus={typingStatus}
                                        handlePinnedConversation={handlePinnedConversation}
                                        userId={userId}
                                        classActive={classActive}
                                        noConvActiveClass={noConvActiveClass}
                                    />
                                ) : null
                            )
                        })}
                    </>
                ) : (
                    null
                )

            }
            {
                notPinnedByMe.length > 0 && typeConv === 1 && hasMatchingConversations ? (
                    <>
                        <h2 className={styles.title}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>

                            Conversations

                        </h2>
                        {notPinnedByMe.map((conversation) => {

                            const classActive = conversation._id === conversationActive ? styles.conversationActive : ''

                            const noConvActiveClass = conversationActive === "" ? styles.noActiveClass : ''

                            return (
                                conversation.name.toLowerCase().includes(search.toLowerCase()) ? (
                                    <Conversation
                                        conversation={conversation}
                                        handleConversationActive={handleConversationActive}
                                        handleHoverConv={handleHoverConv}
                                        handleHoverConvReset={handleHoverConvReset}
                                        typingStatus={typingStatus}
                                        handlePinnedConversation={handlePinnedConversation}
                                        userId={userId}
                                        classActive={classActive}
                                        noConvActiveClass={noConvActiveClass}
                                    />
                                ) : null
                            )
                        })}
                    </>
                ) : (
                    null
                )

            }
            {
                typeConv === 1 && !hasMatchingConversations ? (
                    <NoResult content={conversationsNoResult[typeConv - 1]} />
                ) : (
                    null
                )
            }
        </div>
    )
}

export default ConversationsList