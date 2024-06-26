import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import Header from './Header'
import MessagesArea from './MessagesArea'
import BottomBar from './FilesList'
import NoConvActive from '../NoConvActive/NoConvActive'
import { socket } from '@/pages/_app'
import { useCookie } from '@/hooks/useCookie/useCookie'

interface ChatProps {
    conversationActive: string,
}

const Chat = ({
    conversationActive,
}: ChatProps) => {

    const { cookies } = useCookie()

    const [messages, setMessages] = useState<message[]>([])
    const [showSearchConv, setShowSearchConv] = useState<boolean>(false)
    const [conversationInfos, setConversationInfos] = useState({
        name: '',
        pic: '',
        status: false
    })

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

    socket.on('deletemessage', (data: any) => {
        const { deleted, message_id } = data
        if (deleted === true) {
            const newMessages = messages.filter((message) => message._id !== message_id)
            setMessages(newMessages)
        }
    })

    socket.on('syncmessages', (data) => {
        if (data.conversationId === conversationActive) {
            const oldMessages = messages
            setMessages([...oldMessages, data.messages])
        }
    })

    socket.on('editMessage', (data) => {
        if (data.edited === true) {
            const prevMessages = messages
            const newMessages = prevMessages.map((message) => {
                if (message._id === data.message_id) {
                    message.content = data.content
                }
                return message
            })
            setMessages(newMessages)
        }
    })

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
                        pic={conversationInfos.pic}
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