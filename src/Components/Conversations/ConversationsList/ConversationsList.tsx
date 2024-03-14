import React from 'react'
import styles from './ConversationsList.module.css'
import NoResult from '../NoResult/NoResult'
import Conversation from '../Conversation/Conversation'

const ConversationsList = ({ conversations, conversationActive, handleConversationActive, handleHoverConv, handleHoverConvReset, search, typingStatus, handlePinnedConversation, userId, typeConv, hasMatchingConversations }: ConversationListProps) => {

    const conversationsNoResult: string[] = ["Aucune conversation trouvée", "Aucun groupe n'a été trouvé", "Aucun contact n'a été trouvé"]

    return (
        <div className={styles.convslist}>
            {
                typeConv === 1 && hasMatchingConversations ? (
                    (
                        conversations.map((conversation) => {
                            // const classActive = conversation._id === conversationActive ? 'conversationActive' : ''
                            const classActive = conversation._id === conversationActive ? styles.conversationActive : ''
                            // const topRound = conversation.topRounded === true ? 'convtoprounded' : ''
                            const topRound = conversation.topRounded === true ? styles.convtoprounded : ''
                            // const bottomRound = conversation.bottomRounded === true ? 'convbottomrounded' : ''
                            const bottomRound = conversation.bottomRounded === true ? styles.convbottomrounded : ''
                            // const noConvActiveClass = conversationActive === "" ? 'noActiveClass' : ''
                            const noConvActiveClass = conversationActive === "" ? styles.noActiveClass : ''

                            return (
                                (
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
                                            topRound={topRound}
                                            bottomRound={bottomRound}
                                            noConvActiveClass={noConvActiveClass}
                                        />
                                    ) : null
                                )
                            )
                        })
                    )
                ) : (
                    <NoResult content={conversationsNoResult[typeConv - 1]} />
                )

            }
        </div>
    )
}

export default ConversationsList