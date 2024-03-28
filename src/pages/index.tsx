import React, { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client';
import { decodeToken } from 'react-jwt';
import { useRouter } from 'next/router';

import styles from '@/styles/Home.module.css'
import ConversationsTypes from '@/Components/Conversations/ConversationsTypes/ConversationsTypes';
import Chat from '@/Components/Chat/Chat';
import ConversationsList from '@/Components/Conversations/ConversationsList/ConversationsList';
import NewConversationModal from '@/Components/Conversations/NewConversationModal/NewConversationModal';

const Home = () => {
    const [filesEmpty, setFilesEmpty] = useState<boolean>(true)
    const [typingStatus, setTypingStatus] = useState<{}>({})
    const [userId, setUserId] = useState<string>('')
    
    //déplacer ça dans conversationsList
    const [conversations, setConversations] = useState<ConversationInfos[]>([])
    
    
    const [conversationMessages, setConversationMessages] = useState<message[]>([])
    const [conversationActive, setConversationActive] = useState<string>('')
    
    //refaire ça en séparant les conversations et les messages conversationInfosActive et messagesConversationActive
    const [conv, setConv] = useState<conversation>({} as conversation)
    
    
    const [search, setSearch] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [files, setFiles] = useState<FileInfos[]>([])
    const [searchUsers, setSearchUsers] = useState<string>('')
    const [typeConv, setTypeConv] = useState<number>(1)
    const [showNewConv, setShowNewConv] = useState<boolean>(false)
    
    //déplacer ça dans modal
    const [users, setUsers] = useState<UserInfos[]>([])
    
    //voir pour le déclarer en tant que variable dans _app.tsx car il est utilisé dans plusieurs composants
    const [socket, setSocket] = useState<any>(null)
    
    //dégager ça dans messageArea
    const [showSearchConv, setShowSearchConv] = useState<boolean>(false)

    
    const [showFullSidebar, setShowFullSidebar] = useState<boolean>(true)

    const [clickAwayEffect, setClickAwayEffect] = useState<boolean>(false)

    const router = useRouter()
    let cookies: any;
    if (typeof window !== "undefined") {
        cookies = localStorage.getItem('user')
    }

    if (!cookies) {
        if (typeof window !== "undefined") {
            router.push('/login')
        }
    }

    // faire un hook pour ça
    useEffect(() => {
        if (cookies) {
            const token: User | null = decodeToken(cookies)
            setUserId(token?.userId as string)
        }
    }, [cookies])

    useEffect(() => {
        let cookies;
        if (typeof window !== "undefined") {
            cookies = localStorage.getItem('user')
        }
        const token: User | null = decodeToken(cookies as string)
        setUserId(token?.userId as string)
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

    //déplacer ça dans conversationsList
    const getConversations = async () => {
        socket.emit('conversations', { cookies })
        socket.on('conversations', (data: any) => {
            data.conversations ? setConversations(data.conversations) : console.log('Échec de la connexion:', data.error);
        });
    }

    //déplacer ça dans modal
    const getUsers = async () => {
        socket.emit('users', { cookies })
        socket.on('users', (data: any) => {
            data.users ? setUsers(data.users) : console.log('Échec de la connexion:', data.error);
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

    //exporter le socket et déplacer cette fonction dans le modal
    const createConversation = async (user_id: string) => {
        socket.emit('newconversation', { cookies, user_id })
        socket.on('newconversation', (data: any) => {
            data.created ? (getConversations(), setShowNewConv(false)) : console.log('Échec de la connexion:', data.error);
        });
    }

    const handleNewConv = () => {
        if (!clickAwayEffect) {
            getUsers()
            setShowNewConv(!showNewConv)
            setTimeout(() => {
                setClickAwayEffect(false)
            }, 100)
        } else {
            setClickAwayEffect(false)
        }
    }

    //exporter le socket et déplacer cette fonction dans bottombar
    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        socket.emit('typing', { cookies, conversation_id: conversationActive })
        setMessage(e.target.value)
    }

    

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
            data.sent ? (setMessage(''), setFilesEmpty(true), setFiles([]), getConversationsMessages(conversation_id)) : console.log('Échec de la connexion:', data.error);
        })
    }

    //mettre ça dans conversationsList
    const handlePinnedConversation = (conversation_id: string) => {
        socket.emit('pinconversation', { cookies, conversation_id })
        socket.on('pinconversation', (data: any) => {
            data.pinned ? getConversations() : null
        })
    }

    //dégager ça dans messageArea
    const handleSearchConv = () => {
        setShowSearchConv(!showSearchConv)
    }


    //mettre ça dans messagesList
    const deleteMessage = (message_id: string) => {
        socket.emit('deletemessage', { cookies, message_id, conversationActive })
        socket.on('deletemessage', (data: any) => {
            if (data.deleted) {
                conv.messages = conv.messages.filter((message) => message._id !== message_id)
                setConv({ ...conv })
                setConversationMessages(conv.messages)
            }
        })
    }

    //mettre ça dans messagesList
    const handleReaction = (message_id: string, reaction_id: string) => {
        socket.emit('reaction', { cookies, message_id, reaction_id, conversationActive })
        socket.on('reaction', (data: any) => {
            data.reacted ? getConversationsMessages(conversationActive) : null
        })
    }



    return (
        <div className={styles.home}>

            <ConversationsTypes setTypeConv={setTypeConv} typeConv={typeConv} />

            <ConversationsList
                conversations={conversations}
                conversationActive={conversationActive}
                handleConversationActive={handleConversationActive}
                search={search}
                // voir le passer en tant que context car il n'est utilisé que loin dans l'arbre
                typingStatus={typingStatus}
                handlePinnedConversation={handlePinnedConversation}
                typeConv={typeConv}
                showFullSidebar={showFullSidebar}
                setShowFullSidebar={setShowFullSidebar}
                handleNewConv={handleNewConv}
                setSearch={setSearch}
                showNewConv={showNewConv}
            />

            <NewConversationModal showNewConv={showNewConv} setShowNewConv={setShowNewConv} users={users} searchUsers={searchUsers} handleSearchUsers={handleSearchUsers} createConversation={createConversation} clickAwayEffect={clickAwayEffect} setClickAwayEffect={setClickAwayEffect} />

            <Chat
                conversationActive={conversationActive}
                conversationInfos={conv.conversationInfos}
                messages={conv.messages}
                showSearchConv={showSearchConv}
                handleSearchConv={handleSearchConv}
                message={message}
                handleMessageChange={handleMessageChange}
                sendMessage={sendMessage}
                // voir le passer en tant que context car il n'est utilisé que loin dans l'arbre
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
