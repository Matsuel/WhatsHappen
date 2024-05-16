import React, { useEffect, useRef, useState } from 'react'
import { socket } from './_app';
import styles from '@/styles/Home.module.css'
import Chat from '@/Components/Chat/Chat';
import Sidebar from '@/Components/Sidebar/Sidebar';
import Head from 'next/head';
import Modal from '@/Components/Modal/Modal';
import { useCookie } from '@/hooks/useCookie/useCookie';

const Home = () => {

    const { cookies, userId } = useCookie()
    
    const [conversationActive, setConversationActive] = useState<string>('')
    const [showNewConv, setShowNewConv] = useState<boolean>(false)

    useEffect(() => {
        socket.emit('synchro', { userId: userId })
        socket.emit('conversations', { cookies })        

        setInterval(() => {
            socket.emit('synchrostatus', { userId: userId })
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
