import React, { useState } from 'react'
import './Home.css'
//@ts-ignore
import Profile from '../../assets/Profile.svg'
//@ts-ignore
import Archive from '../../assets/Archive.svg'
//@ts-ignore
import Read from '../../assets/Read.svg'
//@ts-ignore
import Circle from '../../assets/Circle.svg'
//@ts-ignore
import Expand from '../../assets/Expand.svg'
//@ts-ignore
import Conv1 from '../../assets/conv1.svg'
//@ts-ignore
import PhoneConv from '../../assets/PhoneConv.svg'
//@ts-ignore
import Phone from '../../assets/Phone.svg'
//@ts-ignore
import Video from '../../assets/Video.svg'
//@ts-ignore
import Search from '../../assets/Search.svg'
//@ts-ignore
import Online from '../../assets/Online.svg'
//@ts-ignore
import Privacy from '../../assets/Privacy.svg'

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

const messages: message[] = [
    {
        message: 'Salut',
        hour: '12:00',
        sender: 'me',
        isRead: true,
        type: 'text'
    },
    {
        message: "Salut ça va ?",
        hour: '12:00',
        sender: 'him',
        isRead: true,
        type: 'text'
    }

]


const conversationList: conversationList = {
    conversations: [
        {
            id: 1,
            name: 'Groupe 1',
            avatar: '',
            lastMessage: 'Salut',
            lastMessageHour: '12:00',
            isLastMessageReceivedRead: true,
            isLastMessageSendRead: true,
            isArchived: false,
            isPin: false,
            messageType: 'text',
            messages: messages,
            numberOfUnreadMessages: 0
        },
        {
            id: 2,
            name: 'Groupe 2',
            avatar: '',
            lastMessage: 'Salut',
            lastMessageHour: '12:00',
            isLastMessageReceivedRead: true,
            isLastMessageSendRead: true,
            isArchived: false,
            isPin: false,
            messageType: 'text',
            messages: [],
            numberOfUnreadMessages: 0
        },
        {
            id: 3,
            name: 'Groupe 3',
            avatar: '',
            lastMessage: 'Salut',
            lastMessageHour: '12:00',
            isLastMessageReceivedRead: true,
            isLastMessageSendRead: true,
            isArchived: false,
            isPin: false,
            messageType: 'text',
            messages: [],
            numberOfUnreadMessages: 5
        },
        {
            id: 4,
            name: 'Groupe 4',
            avatar: '',
            lastMessage: 'Salut',
            lastMessageHour: '12:00',
            isLastMessageReceivedRead: true,
            isLastMessageSendRead: true,
            isArchived: false,
            isPin: false,
            messageType: 'text',
            messages: [],
            numberOfUnreadMessages: 1
        },
        {
            id: 5,
            name: 'Groupe 5',
            avatar: '',
            lastMessage: 'Salut',
            lastMessageHour: '12:00',
            isLastMessageReceivedRead: true,
            isLastMessageSendRead: true,
            isArchived: false,
            isPin: false,
            messageType: 'text',
            messages: [],
            numberOfUnreadMessages: 7
        }
    ]
}

const Home = () => {
    const [search, setSearch] = useState('')

    const handleChange = (e: any) => {
        setSearch(e.target.value)
    }

    const [countArchived, setCountArchived] = useState(0)

    const [placeholderText, setPlaceholderText] = useState('Rechercher une conversation');

    const handlePlaceholder = () => {
        if (placeholderText !== '') {
            setPlaceholderText('')
        } else {
            setPlaceholderText('Rechercher une conversation')
        }
    }

    const [tabActive, setTabActive] = useState(0);

    const handleTabActive = (tab: number) => {
        setTabActive(tab)
    }

    const [convActive, setConvActive] = useState(0);

    const handleConvActive = (conv: number) => {
        setConvActive(conv)
    }


    return (
        <div className='home-wrapper'>
            <div className="conversation">
                <div className="conv-bar">
                    <div className="avatar-title-wrapper-conv">
                        <div className="avatar-conv-bar">
                            <img src={Profile} alt="Avatar" className="avatar" />
                        </div>
                        <div className="avatar-conv-bar">
                            <img src={Circle} alt="Circle" className='avatar' />
                        </div>
                    </div>
                    <div className="avatar-dots-wrapper-conv">
                        <img src={Expand} alt="Add" className="avatar" />
                    </div>
                </div>
                <div className="search-bar-conv">
                    <input onChange={(e: any) => handleChange(e)} type="text" placeholder={placeholderText} onClick={handlePlaceholder} onBlur={handlePlaceholder} className="search-input-conv" />
                </div>
                <div className="type-conv">
                    <h1 key={0} className={`type-conv-title type-conv-title1 ${tabActive === 0 ? "type-conv-active" : ""}`} onClick={() => handleTabActive(0)} >Favorites</h1>
                    <h1 key={1} className={`type-conv-title ${tabActive === 1 ? "type-conv-active" : ""}`} onClick={() => handleTabActive(1)}>Amis</h1>
                    <h1 key={2} className={`type-conv-title type-conv-title3 ${tabActive === 2 ? "type-conv-active" : ""}`} onClick={() => handleTabActive(2)}>Groupes</h1>

                </div>
                <div className="archived-conv">
                    <img src={Archive} alt="Archive" className='archive-logo' />
                    <h1 className='archive-title'>Archivées</h1>
                    <h1 className='archive-count'>{countArchived}</h1>
                </div>
                <div className="conv-list">
                    {conversationList.conversations.length === 0 ? (
                        <div className="no-conv">
                            Aucune converstation pour le moment appuyer sur le bouton + pour en créer une
                        </div>
                    ) : (
                        conversationList.conversations.map((conversation: conversation) => (
                            <><div className="conv-wrapper">
                                <div className={`conv ${conversation.id === convActive ? "conv-active" : ""}`} key={conversation.id} onClick={() => handleConvActive(conversation.id)}>
                                    <div className="avatar-conv">
                                        <img src={Conv1} alt="Avatar" className="conv-logo" />
                                    </div>
                                    <div className="conv-details">
                                        <div className="conv-top-details">
                                            <h1 className="conv-name">{conversation.name}</h1>
                                            {conversation.isLastMessageReceivedRead ? (
                                                <h1 className="conv-hour">{conversation.lastMessageHour}</h1>
                                            ) : (
                                                <h1 className="conv-hour-unread">{conversation.lastMessageHour}</h1>
                                            )}
                                        </div>
                                        <div className="conv-bottom-details">
                                            {conversation.isLastMessageSendRead ? (
                                                <div className="lastMessageUnread">
                                                    <img src={Read} alt="DoubleTick" className="doubleTick" />
                                                    <h1 className="lastMessage">{conversation.lastMessage}</h1>
                                                </div>
                                            ) : (
                                                <div className="lastMessageRead">
                                                    <h1 className="lastMessage message-read">{conversation.lastMessage}</h1>
                                                </div>

                                            )}

                                            {conversation.numberOfUnreadMessages > 0 ? (
                                                <h1 className="numberOfUnreadMessages">
                                                    {conversation.numberOfUnreadMessages > 5 ? (
                                                        "5+"
                                                    ) : (
                                                        conversation.numberOfUnreadMessages
                                                    )}
                                                </h1>
                                            ) : (
                                                <div className="">

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                        ))
                    )}
                </div>
            </div>
            <div className="converstion-active">
                {convActive === 0 ? (
                    <div className="conversation-default">
                        <div className="no-conv-active">
                            <img src={PhoneConv} alt="" />
                            <h1 className="no-conv-title-active">Gardez votre téléphone connecté</h1>
                            <p className="no-conv-subtitle-active">Whatsapp se connecte à votre téléphone pour synchroniser les messages. Pour réduire l’utilisation des données. connectez votre téléphone au Wi-Fi.</p>
                        </div>
                    </div>
                ) : (
                    <div className="conversation-with-datas">
                        <div className="conversation-bar">
                            <div className="conversation-infos">
                                <img src={Conv1} alt="conv1" className='conv-logo-bar' />
                                <div className="conversation-name-wrap">
                                    <h1 className="conversation-name">{conversationList.conversations[convActive - 1].name}</h1>
                                    <h1 className="status"><img src={Online} alt="Online" /> En ligne</h1>
                                </div>
                            </div>
                            <div className="conversation-actions">
                                <button className='conversation-bar-button'>
                                    <img src={Phone} alt="Phone" className='conversation-bar-icon' />
                                </button>
                                <button className='conversation-bar-button'>
                                    <img src={Video} alt="Video" className='conversation-bar-icon' />
                                </button>
                                <button className='conversation-bar-button'>
                                    <img src={Search} alt="Search" className='conversation-bar-icon' />
                                </button>
                                <button className='conversation-bar-button'>
                                    <img src={Expand} alt="Expand" className='conversation-bar-icon' />
                                </button>
                            </div>
                        </div>
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
                                    {conversationList.conversations[convActive - 1].messages.map((message: message) => (
                                        <div className={`message ${message.sender === 'me' ? "message-me" : "message-him"}`}>
                                            <div className="message-content">
                                                <h1 className="message-content-text">{message.message}</h1>
                                                <h1 className="message-content-hour">{message.hour}</h1>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home