import React, { MouseEventHandler } from 'react'
import "./ConversationsList.css"
import Conv1 from '../../../assets/conv1.svg'
import Online from '../../../assets/Online.svg'
import Offline from '../../../assets/Offline.svg'
import DoubleChevrons from '../../../assets/DoubleChevrons.svg'
import Pinned from '../../../assets/Pinned.svg'
import Pin from '../../../assets/Pin.svg'
import ShowDate from '../../Home/ShowDate/ShowDate'
import NoResult from '../NoResult/NoResult'

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
                                        // Créer composant pour afficher une conversation
                                        <div className={`conversation ${classActive} ${topRound} ${bottomRound} ${noConvActiveClass}`} key={conversation._id} onMouseEnter={() => handleHoverConv(conversation._id)} onMouseLeave={handleHoverConvReset}>
                                            {/* Créer un composant pour afficher une image et un status */}
                                            <div className="convimagestatus" onClick={() => handleConversationActive(conversation._id)}>
                                                <img src={conversation.pic ? `data:image/jpeg;base64,${conversation.pic}` : Conv1} alt="conv1" className='conversationimage' />
                                                <img src={conversation.status ? Online : Offline} alt="online" className='speakerstatus' />
                                            </div>

                                            {/* Créer composant pour afficher les infos de la conversation */}
                                            <div className="conversationinfos" onClick={() => handleConversationActive(conversation._id)}>
                                                {/* Voir si j'ai pas besoin de créer un composant pour afficher le nom ailleurs */}
                                                <div>{conversation.name.charAt(0).toUpperCase() + conversation.name.slice(1)}</div>
                                                {/* Composant pour afficher le dernier message ou le statut de la conversation */}
                                                <div>
                                                    {
                                                        typingStatus[conversation._id as keyof typeof typingStatus] ?
                                                            "Est en train d'écrire" :
                                                            <>
                                                                {
                                                                    conversation.last_message_sender !== userId &&
                                                                    <img src={DoubleChevrons} alt="doublechevrons" />
                                                                }
                                                                {
                                                                    conversation.last_message_content && conversation.last_message_content.length > 20 ?
                                                                        conversation.last_message_content.slice(0, 20) + "..." :
                                                                        conversation.last_message_content
                                                                }
                                                            </>
                                                    }
                                                </div>
                                            </div>

                                            <ShowDate date={conversation.last_message_date} />
                                            <img src={conversation.pinnedBy.includes(userId) ? Pinned : Pin} alt="pinned" className='pinned' onClick={() => handlePinnedConversation(conversation._id)} />
                                        </div>
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