import React from 'react'
import "./ConversationsList.css"
import NoResult from '../NoResult/NoResult'
import Conversation from '../Conversation/Conversation'

const ConversationsList = ({ conversations, conversationActive, handleConversationActive, handleHoverConv, handleHoverConvReset, search, typingStatus, handlePinnedConversation, userId, typeConv, hasMatchingConversations, conversationsNoResult }: ConversationListProps) => {
    return (
        <div className="convslist">
            {
                typeConv === 1 && hasMatchingConversations ? (
                    (
                        conversations.map((conversation) => {
                            const classActive = conversation._id === conversationActive ? 'conversationActive' : ''
                            const topRound = conversation.topRounded === true ? 'convtoprounded' : ''
                            const bottomRound = conversation.bottomRounded === true ? 'convbottomrounded' : ''
                            const noConvActiveClass = conversationActive === "" ? 'noActiveClass' : ''

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