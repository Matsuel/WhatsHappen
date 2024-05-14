import React, { useEffect, useState } from 'react'
import { decodeToken } from 'react-jwt';
import { useRouter } from 'next/router';
import { socket } from './_app';
import styles from '@/styles/Home.module.css'
import Chat from '@/Components/Chat/Chat';
import Sidebar from '@/Components/Sidebar/Sidebar';
import Head from 'next/head';
import Modal from '@/Components/Modal/Modal';

const Home = () => {

    //dégager ça dans bottombar
    const [filesEmpty, setFilesEmpty] = useState<boolean>(true)
    //dégager ça dans bottombar
    const [message, setMessage] = useState<string>('')

    //dégager ça dans bottombar
    const [files, setFiles] = useState<FileInfos[]>([])

    const [userId, setUserId] = useState<string>('')

    //déplacer ça dans conversationsList
    const [conversations, setConversations] = useState<ConversationInfos[]>([])


    //dégager ça dans messagesList et l'utiliser à la place de conv
    const [conversationMessages, setConversationMessages] = useState<message[]>([])

    //dégager ça dans conversationsList
    const [conversationActive, setConversationActive] = useState<string>('')

    //refaire ça en séparant les conversations et les messages conversationInfosActive et messagesConversationActive
    const [conv, setConv] = useState<conversation>({} as conversation)


    const [search, setSearch] = useState<string>('')
    const [showNewConv, setShowNewConv] = useState<boolean>(false)

    //dégager ça dans messageArea
    const [showSearchConv, setShowSearchConv] = useState<boolean>(false)

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

        socket.emit('synchro', { userId: userId })

        //enlever ça car y'a déjà une fonction qui fait ça pareil pour le on
        socket.emit('conversations', { cookies })

        socket.on('conversations', (data) => {
            if (data.conversations) {
                setConversations(data.conversations)
            } else {
                console.log('Échec de la connexion:', data.error);
            }
        });

        

        //deplacer ça dans messagesList
        socket.on('syncmessages', (data) => {
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

        // pas besoin de ça vu qu'on a la liste des gens connectés
        socket.on('synchrostatus', (data) => {
            const statusOther = data.status
            setConversations((prevConversations) => {
                return prevConversations.map((conv) => {
                    return { ...conv, status: statusOther[conv._id] }
                })
            })

        })

        // pas besoin de ça vu qu'on a la liste des gens connectés
        setInterval(() => {
            socket.emit('synchrostatus', { userId: userId })
        }, 5000)
    }, [])

    //dégager ça dans conversationsList
    const handleConversationActive = (conversationId: string) => {
        if (conversationId === conversationActive) {
            setConversationActive('')
            return
        }
        setConversationActive(conversationId)
        socket.emit('conversationmessages', { cookies, conversation_id:conversationId })
        conv.messages = conversationMessages
        conv.conversationInfos = conversations.find((conv) => conv._id === conversationId) as ConversationInfos
        conv.conversationInfos.bottomRounded = true
        conv.conversationInfos.topRounded = true
    }

    //exporter le socket et déplacer cette fonction dans le modal
    

    //dégager ça dans modal
    const handleNewConv = () => {
        if (!clickAwayEffect) {
            setShowNewConv(!showNewConv)
            setTimeout(() => {
                setClickAwayEffect(false)
            }, 100)
        } else {
            setClickAwayEffect(false)
        }
    }

    //exporter le socket et déplacer cette fonction dans bottombar
    const handleMessageChange = (e: string,emoji: boolean) => {
        socket.emit('typing', { cookies, conversation_id: conversationActive })
        emoji ? setMessage(message + e) : setMessage(e)
    }

    //dégager ça dans bottombar
    const sendMessage = async (conversation_id: string, files: FileInfos[]) => {
        const content = message
        if (content.trim() === '' && files.length === 0) return
        socket.emit('newmessage', { cookies, conversation_id, content, files })
        socket.on('newmessage', (data: any) => {
            data.sent ? (setMessage(''), setFilesEmpty(true), setFiles([]), socket.emit('conversationmessages', { cookies, conversation_id })) : console.log('Échec de la connexion:', data.error);
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
    



    return (
        <div className={styles.home}>

            <Head>
                <title>Whatshappen</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Sidebar
                conversationActive={conversationActive}
                handleConversationActive={handleConversationActive}
                search={search}
                handleNewConv={handleNewConv}
                setSearch={setSearch}
            />

            <Modal
                showNewConv={showNewConv}
                setShowNewConv={setShowNewConv}
                clickAwayEffect={clickAwayEffect}
                setClickAwayEffect={setClickAwayEffect}
            />

            <Chat
                conversationActive={conversationActive}
                showSearchConv={showSearchConv}
                handleSearchConv={handleSearchConv}
                message={message}
                handleMessageChange={handleMessageChange}
                sendMessage={sendMessage}
                filesEmpty={filesEmpty}
                deleteMessage={deleteMessage}
                files={files}
                setFiles={setFiles}
                setFilesEmpty={setFilesEmpty}
            />

        </div>
    )
}

export default Home
