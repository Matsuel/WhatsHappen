import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import Header from './Header'
import MessagesArea from './MessagesArea'
import BottomBar from './FilesList'
import NoConvActive from '../NoConvActive/NoConvActive'
import { socket } from '@/pages/_app'

interface ChatProps {
    conversationActive: string,
}

const Chat = ({
    conversationActive,
}: ChatProps) => {

    const [messages, setMessages] = useState<message[]>([])
    const [conversationInfos, setConversationInfos] = useState({
        name: '',
        pic: '',
        status: false
    })

    let cookies = ""
    if (typeof window !== 'undefined') {
        cookies = localStorage.getItem('user') || ''
    }

    const getConversationsMessages = async (conversation_id: string) => {
        socket.emit('conversationmessages', { cookies, conversation_id })
        socket.on('conversationmessages', (data: any) => {
            setMessages(data.messages)
        })
    }

    const getOtherInfos = async (conversation_id: string) => {
        socket.emit('otherinfos', { cookies, conversation_id })
        socket.on('otherinfos', (data: any) => {
            setConversationInfos({
                name: data.name,
                pic: data.pic,
                status: data.status
            })
        })
    }

    socket.on('syncmessages', (data) => {
        setMessages(data.messages)
    })

    const [showSearchConv, setShowSearchConv] = useState<boolean>(false)
    const handleSearchConv = () => {
        setShowSearchConv(!showSearchConv)
    }

    useEffect(() => {
        if (conversationActive !== '') {
            getConversationsMessages(conversationActive)
            getOtherInfos(conversationActive)
        }
    }, [conversationActive])

    return (
        <div className={styles.messagessection}>
            {conversationActive !== '' ? (
                <>
                    <Header
                        name={conversationInfos.name}
                        pic={conversationInfos.pic}
                        handleSearchConv={handleSearchConv}
                        showSearchConv={showSearchConv}
                    />

                    <MessagesArea
                        showSearchConv={showSearchConv}
                        messages={messages}
                        messagesCount={messages.length}
                        conversationActive={conversationActive}
                    />

                    <BottomBar
                        conversationActive={conversationActive}
                        name={conversationInfos.name}
                        
                    />
                </>
            ) : (
                <NoConvActive />
            )}
        </div>
    )
}

export default Chat