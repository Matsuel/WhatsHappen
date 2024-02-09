import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client';
import { decodeToken } from 'react-jwt';
import TopBar from '../TopBar/TopBar'
import BottomBar from '../BottomBar/BottomBar'
// @ts-ignore
import Search from '../../assets/Search.svg'
// @ts-ignore
import NewConv from '../../assets/NewConv.svg'
//  @ts-ignore
import Security from '../../assets/Security.svg'

import './Home.css'
import NoConvActive from '../NoConvActive/NoConvActive';



const Home = () => {
    const [socket, setSocket] = useState<any>(null)
    const [conversations, setConversations] = useState<ConversationInfos[]>([])
    const [conversationMessages, setConversationMessages] = useState<message[]>([])
    const [conversationActive, setConversationActive] = useState<string>('')
    const [conv, setConv] = useState<conversation>({} as conversation)
    const [search, setSearch] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [searchUsers, setSearchUsers] = useState<string>('')
    const [typeConv, setTypeConv] = useState<number>(1)
    const [showNewConv, setShowNewConv] = useState<boolean>(false)
    const [canRotate, setCanRotate] = useState<boolean>(false)
    const [users, setUsers] = useState<UserInfos[]>([])
    const [userId, setUserId] = useState<string>('')
    const scrollBottomRef = useRef<HTMLDivElement>(null)

    const cookies = localStorage.getItem('user')

    useEffect(() => {
        if (cookies) {
            const token: User | null = decodeToken(cookies)
            setUserId(token?.userId as string)
        }
    }, [cookies])

    useEffect(() => {
        const cookies = localStorage.getItem('user')
        const token: User | null = decodeToken(cookies as string)
        const userId = token?.userId as string
        setUserId(userId)
        const newSocket = io('http://localhost:3001')

        newSocket.on('connect', () => {

            setSocket(newSocket)
        })
        newSocket.emit('synchro', { userId: userId })

        newSocket.emit('conversations', { cookies })

        newSocket.on('conversations', (data) => {
            if (data.conversations) {
                setConversations(data.conversations)
            } else {
                console.log('Échec de la connexion:', data.error);
            }
        });

        newSocket.on('syncmessages', (data) => {
            setConversationMessages(data.messages)
            conv.messages = data.messages
        })

        return () => {
            newSocket.close()
        }
    }, [])

    const getConversations = async () => {
        socket.emit('conversations', { cookies })
        socket.on('conversations', (data: any) => {
            if (data.conversations) {
                setConversations(data.conversations)
            } else {
                console.log('Échec de la connexion:', data.error);
            }
        });
    }

    const getUsers = async () => {
        socket.emit('users', { cookies })
        socket.on('users', (data: any) => {
            if (data.users) {
                setUsers(data.users)
            } else {
                console.log('Échec de la connexion:', data.error);
            }
        });
    }

    const handleConversationActive = (conversationId: string) => {
        if (conversationId === conversationActive) {
            setConversationActive('')
            return
        }
        setConversationActive(conversationId)
        getConversationsMessages(conversationId)
        conv.messages = conversationMessages
        conv.conversationInfos = conversations.find((conv) => conv._id === conversationId) as ConversationInfos
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleSearchUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchUsers(e.target.value.trim())
    }

    const createConversation = async (user_id: string) => {
        socket.emit('newconversation', { cookies, user_id })
        socket.on('newconversation', (data: any) => {
            if (data.created) {
                getConversations()
                getUsers()
            }
        })
    }

    const handleNewConv = () => {
        getUsers()
        setShowNewConv(!showNewConv)
        setCanRotate(true)
        rotateForSec()
    }

    const rotateForSec = () => {
        setTimeout(() => {
            setCanRotate(false)
        }, 500)
    }

    useEffect(() => {
        if (scrollBottomRef.current) {
            scrollBottomRef.current.scrollIntoView()
        }
    }, [conversationMessages])

    const getConversationsMessages = async (conversation_id: string) => {
        socket.emit('conversationmessages', { cookies, conversation_id })
        socket.on('conversationmessages', (data: any) => {
            setConversationMessages(data.messages)
            conv.messages = data.messages
        })
    }

    const sendMessage = async (conversation_id: string) => {
        const content = message
        if (content.trim() === '') return
        socket.emit('newmessage', { cookies, conversation_id, content })
        socket.on('newmessage', (data: any) => {
            if (data.sent) {
                setMessage('')
                getConversationsMessages(conversation_id)
            }
        })
    }

    return (
        <div className="home">
            <div className="conversations-section">
                <div className="searchBar">
                    <img src={Search} alt="search" className='searchLogo' />
                    <input type="text" placeholder='Rechercher une conversation ici' name="search" id="search" className='convSearch' onChange={handleSearch} />
                </div>

                <div className="convstype">
                    <div className={`convtype ${typeConv === 1 ? 'convtypeActive' : ''}`} onClick={() => setTypeConv(1)}>
                        Conversations
                    </div>
                    <div className={`convtype ${typeConv === 2 ? 'convtypeActive' : ''}`} onClick={() => setTypeConv(2)}>
                        Groupes
                    </div>
                    <div className={`convtype ${typeConv === 3 ? 'convtypeActive' : ''}`} onClick={() => setTypeConv(3)}>
                        Contacts
                    </div>
                </div>

                <div className="convslist">
                    {
                        typeConv === 1 ? (
                            (
                                conversations.map((conversation) => {
                                    return (
                                        (
                                            conversation.name.toLowerCase().includes(search.toLowerCase()) ? (
                                                <div className={`conversation ${conversation._id === conversationActive ? 'conversationActive' : ''}`} onClick={() => handleConversationActive(conversation._id)} key={conversation._id}>
                                                    <p>{conversation.name.charAt(0).toUpperCase() + conversation.name.slice(1)}</p>
                                                </div>
                                            ) : null
                                        )
                                    )
                                })
                            )
                        ) : null
                    }
                </div>

                {showNewConv ? (
                    <div className="newconvmodal">
                        <input type="text" placeholder='Nom de votre interlocuteur' className='newconvinput' onChange={handleSearchUsers} />
                        {users.length > 0 ? (
                            users.map((user) => {
                                return (
                                    user.username.toLowerCase().includes(searchUsers.toLowerCase()) ? (
                                        <div className="newconvuser" key={user._id} onClick={() => createConversation(user._id)}>
                                            <p>{user.username}</p>
                                        </div>
                                    ) : null
                                )
                            })
                        ) : null}
                    </div>
                ) : null}

                <div className={`newconv-div ${canRotate ? 'newConv-rotate' : ''}`} onClick={() => handleNewConv()}>
                    <img src={NewConv} alt="newconv" className='newConv' />
                </div>
            </div>

            <div className="messages-section">
                {conversationActive !== '' ? (
                    <>
                        <TopBar 
                            conversation={conv} 
                        />

                        <div className="messagesection">
                            <div className="messageprivacy">
                                <img src={Security} alt="security" className='security' />
                                <p className='securitymessage'>Les messages sont chiffrés de bout en bout. Personne en dehors de ce chat, pas même WhatsApp, ne peut les lire ou les écouter, cliquez pour en savoir plus.</p>
                            </div>

                            {conv.messages.map((message, i) => {
                                return (
                                    <div className="message" ref={i === conv.messages.length - 1 ? scrollBottomRef : null} >
                                        <div className={message.sender_id === userId ? 'messagesent' : 'messagereceived'} key={message._id}>
                                            <p className='messagecontent'>
                                                {message.content}
                                            </p>
                                            <p className='messagetime'>
                                                {new Date(message.date).getHours()}:
                                                {Math.round(new Date(message.date).getMinutes() / 10)}{new Date(message.date).getMinutes() % 10}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <BottomBar
                            conversationActive={conversationActive}
                            message={message}
                            setMessage={setMessage}
                            sendMessage={sendMessage}
                        />
                    </>
                ) : (
                    <NoConvActive />
                )}

            </div>

        </div>
    )
}

export default Home
