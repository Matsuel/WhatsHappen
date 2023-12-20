import React, { useState } from 'react'
import './Home.css'
//@ts-ignore
import Conv1 from '../../assets/conv1.svg'
//@ts-ignore
import PhoneConv from '../../assets/PhoneConv.svg'
//@ts-ignore
import Online from '../../assets/Online.svg'
//@ts-ignore
import Privacy from '../../assets/Privacy.svg'
import ConversationsActions from './ConversationsActions.tsx'
import Messages from './Messages.tsx'
import ConvBar from './ConvBar.tsx'

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
        message: 'Salut SalutSalutSalutSalutSalu tSalutSalutSalutSalu tSalutSalut',
        hour: '12:00',
        sender: 'me',
        isRead: true,
        type: 'text'
    },
    {
        message: "Salut ça va ?",
        hour: '12:00',
        sender: 'him',
        isRead: false,
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
    const [convActive, setConvActive] = useState(0);

    const handleConvActive = (conv: number) => {
        setConvActive(conv)
    }

    return (
        <div className='home-wrapper'>
            <ConvBar conversationList={conversationList} convActive={convActive} handleConvActive={handleConvActive} />
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
                            <ConversationsActions />
                        </div>
                        <Messages conversationList={conversationList} convActive={convActive} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home