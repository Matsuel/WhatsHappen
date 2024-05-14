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
    const [message, setMessage] = useState<string>('')

    const [userId, setUserId] = useState<string>('')

    //dégager ça dans conversationsList
    const [conversationActive, setConversationActive] = useState<string>('')

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

        

        // pas besoin de ça vu qu'on a la liste des gens connectés
        setInterval(() => {
            socket.emit('synchrostatus', { userId: userId })
        }, 5000)
    }, [])

    //deplacer ça dans messagesList
    socket.on('syncmessages', (data) => {
        console.log(data)
    })

    // pas besoin de ça vu qu'on a la liste des gens connectés
    socket.on('synchrostatus', (data) => {
        console.log(data)
    })

    //dégager ça dans conversationsList
    const handleConversationActive = (conversationId: string) => {
        if (conversationId === conversationActive) {
            setConversationActive('')
            return
        }
        setConversationActive(conversationId)
        socket.emit('conversationmessages', { cookies, conversation_id:conversationId })
    }
    
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
            data.sent ? (setMessage(''), socket.emit('conversationmessages', { cookies, conversation_id })) : console.log('Échec de la connexion:', data.error);
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
            }
        })
    }

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
                deleteMessage={deleteMessage}
            />

        </div>
    )
}

export default Home
