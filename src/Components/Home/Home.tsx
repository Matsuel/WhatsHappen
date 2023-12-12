import React, { useState } from 'react'
import './Home.css'
//@ts-ignore
import Add from '../../assets/add.svg'
//@ts-ignore
import Profile from '../../assets/Profile.svg'
//@ts-ignore
import Dots from '../../assets/Dots.svg'
//@ts-ignore
import Archive from '../../assets/Archive.svg'
//@ts-ignore
import DoubleTick from '../../assets/DoubleTick.svg'

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
    messages: [],
    numberOfUnreadMessages: number
}

interface conversationList {
    conversations: conversation[]
}

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
            messages: [],
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
        console.log(search)
    }

    const [countArchived, setCountArchived] = useState(0)

    return (
        <div className='home-wrapper'>
            <div className="conversation">
                <div className="conv-bar">
                    <div className="avatar-title-wrapper-conv">
                        <div className="avatar-conv-bar">
                            <img src={Profile} alt="Avatar" className="avatar" />
                        </div>
                        <h1 className="title-conv-bar">
                            Conversations
                        </h1>
                    </div>
                    <div className="avatar-dots-wrapper-conv">
                        <img src={Add} alt="Add" className="avatar" />
                        <img src={Dots} alt="Dots" className="avatar" />
                    </div>
                </div>
                <div className="search-bar-conv">
                    <input onChange={(e: any) => handleChange(e)} type="text" placeholder="Rechercher ou commencer une nouvelle conversation" className="search-input-conv" />
                </div>
                <div className="archived-conv">
                    <img src={Archive} alt="Archive" className='archive-logo' />
                    <h1 className='archive-title'>Archivées</h1>
                    <h1 className='archive-count'>{countArchived}</h1>
                </div>
                <div className="conv-list">
                    {conversationList.conversations.map((conversation: conversation) => (
                        <div className="conv" key={conversation.id}>
                            <div className="avatar-conv">
                                <img src={Profile} alt="Avatar" className="conv-logo" />
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
                                            <img src={DoubleTick} alt="DoubleTick" className="doubleTick" />
                                            <h1 className="lastMessage">{conversation.lastMessage}</h1>
                                        </div>
                                    ) : (
                                        <div className="lastMessageRead">
                                            <h1 className="lastMessage message-read">{conversation.lastMessage}</h1>
                                        </div>

                                    )}

                                    {conversation.numberOfUnreadMessages > 0 ? (
                                        <h1 className="numberOfUnreadMessages">{conversation.numberOfUnreadMessages}</h1>
                                    ) : (
                                        <div className="">

                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="converstion-active">
            </div>
        </div>
    )
}

export default Home