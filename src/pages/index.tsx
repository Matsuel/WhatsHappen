import React, { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client';
import { decodeToken } from 'react-jwt';
import SearchbarConv from '@/Components/Conversations/SearchbarConv/SearchbarConv';
import { useRouter } from 'next/router';

import styles from '@/styles/Home.module.css'
import ConversationsTypes from '@/Components/Conversations/ConversationsTypes/ConversationsTypes';
import Chat from '@/Components/Chat/Chat';
import ConversationsList from '@/Components/Conversations/ConversationsList/ConversationsList';
import NewConversationModal from '@/Components/Conversations/NewConversationModal/NewConversationModal';

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
    const [files, setFiles] = useState<FileInfos[]>([])
    const [searchUsers, setSearchUsers] = useState<string>('')
    const [typeConv, setTypeConv] = useState<number>(1)
    const [showNewConv, setShowNewConv] = useState<boolean>(false)
    const [canRotate, setCanRotate] = useState<boolean>(false)
    const [users, setUsers] = useState<UserInfos[]>([])
    const [userId, setUserId] = useState<string>('')
    const scrollBottomRef = useRef<HTMLDivElement>(null)
    const [hasMatchingConversations, setHasMatchingConversations] = useState<boolean>(true)

    const [showFullSidebar, setShowFullSidebar] = useState<boolean>(true)

    const [clickAwayEffect, setClickAwayEffect] = useState<boolean>(false)

    const router = useRouter()
    // const cookies = localStorage.getItem('user')
    let cookies: any;
    if (typeof window !== "undefined") {
        cookies = localStorage.getItem('user')
    }

    if (!cookies) {
        // window.location.href = '/login'
        if (typeof window !== "undefined") {
            router.push('/login')
        }
    }

    useEffect(() => {
        if (cookies) {
            const token: User | null = decodeToken(cookies)
            setUserId(token?.userId as string)
        }
    }, [cookies])

    useEffect(() => {
        // const cookies = localStorage.getItem('user')
        let cookies;
        if (typeof window !== "undefined") {
            cookies = localStorage.getItem('user')
        }
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
            setConv({ ...conv, messages: data.messages })
            // voir si on peut pas faire autrement voir pk cpt, ça reçoit plus de messages
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
        // getUsers()
        // setShowNewConv(!showNewConv)
        // setCanRotate(true)
        // rotateForSec()
        if (!clickAwayEffect) {
            getUsers()
            setShowNewConv(!showNewConv)
            setCanRotate(true)
            rotateForSec()
            setTimeout(() => {
                setClickAwayEffect(false)
            }, 100)
        } else {
            setClickAwayEffect(false)
        }
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
            setConversationMessages(data.messages)
            conv.messages = data.messages
        })
    }

    const sendMessage = async (conversation_id: string, files: FileInfos[]) => {
        const content = message
        if (content.trim() === '' && files.length === 0) return
        socket.emit('newmessage', { cookies, conversation_id, content, files })
        socket.on('newmessage', (data: any) => {
            if (data.sent) {
                setMessage('')
                setFilesEmpty(true)
                setFiles([])
                getConversationsMessages(conversation_id)
                // getConversations()
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

    const deleteMessage = (message_id: string) => {
        console.log(message_id)
        socket.emit('deletemessage', { cookies, message_id, conversationActive })
        socket.on('deletemessage', (data: any) => {
            if (data.deleted) {
                conv.messages = conv.messages.filter((message) => message._id !== message_id)
                setConv({ ...conv })
                setConversationMessages(conv.messages)
            }
        })
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

    const handleReaction = (message_id: string, reaction_id: string) => {
        socket.emit('reaction', { cookies, message_id, reaction_id, conversationActive })
        socket.on('reaction', (data: any) => {
            if (data.reacted) {
                getConversationsMessages(conversationActive)
                // conv.messages = conversationMessages
                // setConv({...conv})
            }
        })
    }



    return (
        <div className={styles.home}>

            <ConversationsTypes setTypeConv={setTypeConv} typeConv={typeConv} />

            <ConversationsList
                conversations={conversations}
                conversationActive={conversationActive}
                handleConversationActive={handleConversationActive}
                handleHoverConv={handleHoverConv}
                handleHoverConvReset={handleHoverConvReset}
                search={search}
                typingStatus={typingStatus}
                handlePinnedConversation={handlePinnedConversation}
                userId={userId}
                typeConv={typeConv}
                hasMatchingConversations={hasMatchingConversations}
                showFullSidebar={showFullSidebar}
                setShowFullSidebar={setShowFullSidebar}
                handleNewConv={handleNewConv}
                setHasMatchingConversations={setHasMatchingConversations}
                setSearch={setSearch}
            />

            <NewConversationModal showNewConv={showNewConv} setShowNewConv={setShowNewConv} users={users} searchUsers={searchUsers} handleSearchUsers={handleSearchUsers} createConversation={createConversation} clickAwayEffect={clickAwayEffect} setClickAwayEffect={setClickAwayEffect} />

            <Chat
                conversationActive={conversationActive}
                conversationInfos={conv.conversationInfos}
                messages={conv.messages}
                userId={userId}
                scrollBottomRef={scrollBottomRef}
                showSearchConv={showSearchConv}
                handleSearchConv={handleSearchConv}
                message={message}
                handleMessageChange={handleMessageChange}
                sendMessage={sendMessage}
                typingStatus={typingStatus}
                filesEmpty={filesEmpty}
                deleteMessage={deleteMessage}
                handleReaction={handleReaction}
                files={files}
                setFiles={setFiles}
                setFilesEmpty={setFilesEmpty}
                showFullSidebar={showFullSidebar}
            />

        </div>
    )
}

export default Home
