import React, { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client';
import { decodeToken } from 'react-jwt';
import TopBar from './TopBar/TopBar'
import BottomBar from './BottomBar/BottomBar'
import Search from '../../assets/Search.svg'
import NewConv from '../../assets/NewConv.svg'
import Conv1 from '../../assets/conv1.svg'
import Online from '../../assets/Online.svg'
import Offline from '../../assets/Offline.svg'
import Pin from '../../assets/Pin.svg'
import Pinned from '../../assets/Pinned.svg'
import NoResult from './NoResult/NoResult';
import DoubleChevrons from '../../assets/DoubleChevrons.svg'

import './Home.css'
import NoConvActive from './NoConvActive/NoConvActive';
import MessagesArea from './MessagesArea/MessagesArea';



const Home = () => {
    const [filesEmpty, setFilesEmpty] = useState<boolean>(true)
    const [typingStatus, setTypingStatus] = useState<{}>({})
    const [socket, setSocket] = useState<any>(null)
    const [conversations, setConversations] = useState<ConversationInfos[]>([])
    const [conversationMessages, setConversationMessages] = useState<message[]>([])
    const [conversationActive, setConversationActive] = useState<string>('')
    const [conv, setConv] = useState<conversation>({} as conversation)
    const [showSearchConv, setShowSearchConv] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [searchUsers, setSearchUsers] = useState<string>('')
    const [typeConv, setTypeConv] = useState<number>(1)
    const [showNewConv, setShowNewConv] = useState<boolean>(false)
    const [canRotate, setCanRotate] = useState<boolean>(false)
    const [users, setUsers] = useState<UserInfos[]>([])
    const [userId, setUserId] = useState<string>('')
    const scrollBottomRef = useRef<HTMLDivElement>(null)
    const [hasMatchingConversations, setHasMatchingConversations] = useState<boolean>(true)
    const conversationsNoResult: string[] = ["Aucune conversation trouvée", "Aucun groupe n'a été trouvé", "Aucun contact n'a été trouvé"]

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

        newSocket.on('typing', (data) => {
            setTypingStatus((prev) => ({
                ...prev,
                [data.conversationId]: data.typing
            }))
        })

        newSocket.on('syncmessages', (data) => {
            setConversationMessages(data.messages)
            // voir si on peut pas faire autrement
            conversations.forEach((conversation) => {
                if (conversation._id === data.conversations[0]._id) {
                    conversation.last_message_content = data.conversations[0].last_message_content
                    conversation.last_message_date = data.conversations[0].last_message_date
                    conversation.last_message_sender = data.conversations[0].last_message_sender
                }
            })
            setConversations([...conversations])
        })

        newSocket.on('synchrostatus', (data) => {
            const statusOther = data.status
            setConversations((prevConversations) => {
                return prevConversations.map((conv) => {
                    return { ...conv, status: statusOther[conv._id] }
                })
            })

        })

        setInterval(() => {
            newSocket.emit('synchrostatus', { userId: userId })
        }, 5000)

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
        conv.conversationInfos.bottomRounded = true
        conv.conversationInfos.topRounded = true
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.trim())
        e.target.value.trim() === "" ? setHasMatchingConversations(true) :
            setHasMatchingConversations(conversations.some((conv) => conv.name.toLowerCase().includes(e.target.value.toLowerCase())))
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

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        socket.emit('typing', { cookies, conversation_id: conversationActive })
        setMessage(e.target.value)
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
            console.log(data)
            setConversationMessages(data.messages)
            conv.messages = data.messages
        })
    }

    const sendMessage = async (conversation_id: string, files: FileInfos[]) => {
        const content = message
        if (content.trim() === '') return
        socket.emit('newmessage', { cookies, conversation_id, content, files })
        socket.on('newmessage', (data: any) => {
            console.log(data)
            if (data.sent) {
                setMessage('')
                getConversationsMessages(conversation_id)
                getConversations()
            }
        })
    }

    const handlePinnedConversation = (conversation_id: string) => {
        socket.emit('pinconversation', { cookies, conversation_id })
        socket.on('pinconversation', (data: any) => {
            if (data.pinned) {
                getConversations()
            }
        })
    }

    const handleSearchConv = () => {
        setShowSearchConv(!showSearchConv)
    }

    const handleHoverConv = (conversation_id: string) => {

        const activeConv = conversations.find((conv) => conv._id === conversationActive)
        const handleConv = conversations.find((conv) => conv._id === conversation_id)

        conversations.forEach((conv) => {
            conv.topRounded = true
            conv.bottomRounded = true
        })

        if (conversationActive && conversation_id !== conversationActive) {
            const handleConvIndex = conversations.indexOf(handleConv as ConversationInfos)
            const activeConvIndex = conversations.indexOf(activeConv as ConversationInfos)

            if (handleConvIndex - activeConvIndex === 1) {
                conversations[handleConvIndex].topRounded = false
                conversations[activeConvIndex].bottomRounded = false
            } else if (handleConvIndex - activeConvIndex === -1) {
                conversations[handleConvIndex].bottomRounded = false
                conversations[activeConvIndex].topRounded = false
            }
            setConversations([...conversations])
        }
    }

    const handleHoverConvReset = () => {
        conversations.forEach((conv) => {
            conv.topRounded = true
            conv.bottomRounded = true
        })
        setConversations([...conversations])
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
                                                <div className={`conversation ${classActive} ${topRound} ${bottomRound} ${noConvActiveClass}`} key={conversation._id} onMouseEnter={() => handleHoverConv(conversation._id)} onMouseLeave={handleHoverConvReset}>
                                                    <div className="convimagestatus" onClick={() => handleConversationActive(conversation._id)}>
                                                        <img src={conversation.pic ? `data:image/jpeg;base64,${conversation.pic}` : Conv1} alt="conv1" className='conversationimage' />
                                                        <img src={conversation.status ? Online : Offline} alt="online" className='speakerstatus' />
                                                    </div>
                                                    <div className="conversationinfos" onClick={() => handleConversationActive(conversation._id)}>
                                                        <div>{conversation.name.charAt(0).toUpperCase() + conversation.name.slice(1)}</div>
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
                                                    <p>
                                                        {
                                                            new Date(conversation.last_message_date).getHours() + ":" +
                                                            (new Date(conversation.last_message_date).getMinutes().toString().padStart(2, '0'))
                                                        }
                                                    </p>
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

                {showNewConv ? (
                    <div className="newconvmodal">
                        <input type="text" placeholder='Nom de votre interlocuteur' className='newconvinput' onChange={handleSearchUsers} />
                        {users.length > 0 && searchUsers !== "" ? (
                            users.map((user) => {
                                return (
                                    user.username.toLowerCase().includes(searchUsers.toLowerCase()) ? (
                                        <div className="newconvuser" key={user._id} onClick={() => createConversation(user._id)}>
                                            <img src={user.pic !== "" ? `data:image/jpeg;base64,${user.pic}` : Conv1} className='userpic' />
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
                            name={conv.conversationInfos.name}
                            pic={conv.conversationInfos.pic}
                            status={conv.conversationInfos.status}
                            handleSearchConv={handleSearchConv}
                            showSearchConv={showSearchConv}
                        />

                        <MessagesArea
                            userId={userId}
                            scrollBottomRef={scrollBottomRef}
                            showSearchConv={showSearchConv}
                            messages={conv.messages}
                            messagesCount={conv.messages.length}
                            filesEmpty={filesEmpty}
                        />

                        <BottomBar
                            conversationActive={conversationActive}
                            message={message}
                            handleMessageChange={handleMessageChange}
                            sendMessage={sendMessage}
                            typingStatus={typingStatus}
                            name={conv.conversationInfos.name}
                            filesEmpty={filesEmpty}
                            setFilesEmpty={setFilesEmpty}
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
