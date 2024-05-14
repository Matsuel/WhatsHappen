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
    const [userId, setUserId] = useState<string>('')

    const [conversationActive, setConversationActive] = useState<string>('')

    const [showNewConv, setShowNewConv] = useState<boolean>(false)    

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
        // console.log(data)
    })
    
    
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

    return (
        <div className={styles.home}>

            <Head>
                <title>Whatshappen</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Sidebar
                conversationActive={conversationActive}
                setConversationActive={setConversationActive}
                handleNewConv={handleNewConv}
            />

            <Modal
                showNewConv={showNewConv}
                setShowNewConv={setShowNewConv}
                clickAwayEffect={clickAwayEffect}
                setClickAwayEffect={setClickAwayEffect}
            />

            <Chat
                conversationActive={conversationActive}
            />

        </div>
    )
}

export default Home
