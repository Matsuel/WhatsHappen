import React, { useEffect, useRef, useState } from 'react'
import { decodeToken } from 'react-jwt';
import { useRouter } from 'next/router';
import { socket } from './_app';
import styles from '@/styles/Home.module.css'
import Chat from '@/Components/Chat/Chat';
import Sidebar from '@/Components/Sidebar/Sidebar';
import Head from 'next/head';
import Modal from '@/Components/Modal/Modal';

const Home = () => {

    const [conversationActive, setConversationActive] = useState<string>('')

    const [showNewConv, setShowNewConv] = useState<boolean>(false)

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

    useEffect(() => {
        let cookies;
        if (typeof window !== "undefined") {
            cookies = localStorage.getItem('user')
        }
        const token: User | null = decodeToken(cookies as string)

        socket.emit('synchro', { userId: token?.userId })

        //enlever ça car y'a déjà une fonction qui fait ça pareil pour le on
        socket.emit('conversations', { cookies })        

        // pas besoin de ça vu qu'on a la liste des gens connectés
        setInterval(() => {
            socket.emit('synchrostatus', { userId: token?.userId })
        }, 5000)
    }, [])
    
    const handleNewConv = () => {
        setShowNewConv(!showNewConv)
    } 

    

    const btnRef = useRef<HTMLButtonElement>(null);

    return (
        <div className={styles.home}>

            <Head>
                <title>iMessages</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Sidebar
                conversationActive={conversationActive}
                setConversationActive={setConversationActive}
                handleNewConv={handleNewConv}
                btnRef={btnRef}
            />

            <Modal
                showNewConv={showNewConv}
                setShowNewConv={setShowNewConv}
                btnRef={btnRef}
            />

            <Chat
                conversationActive={conversationActive}
            />

        </div>
    )
}

export default Home
