import React from 'react'
//@ts-ignore
import Read from '../../assets/Read.svg'
//@ts-ignore
import Privacy from '../../assets/Privacy.svg'
import MessageBar from './MessageBar.tsx'


interface message {
    message: string,
    hour: string,
    sender: string,
    isRead: boolean,
    type: string
}

interface conversation {
    id: number,
    name: string,
    avatar: string,
    lastMessage: string,
    lastMessageHour: string,
    isLastMessageReceivedRead: boolean,
    isLastMessageSendRead: boolean,
    isArchived: boolean,
    isPin: boolean,
    messageType: string,
    messages: message[],
    numberOfUnreadMessages: number
}

interface conversationList {
    conversations: conversation[]
}

const Messages = ({ conversationList, convActive }: { conversationList: conversationList, convActive: number }) => {
    return (
        <div className="conversation-messages">
            {conversationList.conversations[convActive - 1].messages.length === 0 ? (
                <div className="no-messages">
                    <h1 className="no-messages-title">Aucun message pour le moment</h1>
                </div>
            ) : (
                <>
                    <div className="alert-privacy">
                        <img src={Privacy} alt="Privacy" className="alert-privacy-logo" />
                        <h1 className="alert-privacy-title">Messages et appels sont protégés par le chiffrement de bout en bout. Aucun tiers, pas même WhatsApp, ne peut lire ou écouter vos messages ou appels.</h1>
                    </div>
                    <div className="message-area">
                        {conversationList.conversations[convActive - 1].messages.map((message: message) => (
                            <div className={`${message.sender === 'me' ? "message-me" : "message-him"}`}>
                                <div className={`message-content ${message.sender === 'me' ? "color-message-me" : "color-message-him"}`}>
                                    <h1 className="message-content-text">{message.message}</h1>
                                    <div className="bottom-message">
                                        {message.isRead ? (
                                            <img src={Read} alt="Read" className="message-content-read" />
                                        ) : (
                                            ""
                                        )
                                        }
                                        <h1 className="message-content-hour">{message.hour}</h1>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Messages
