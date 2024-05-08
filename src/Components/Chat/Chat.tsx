import React, { useEffect, useState } from 'react'
import styles from './Chat.module.css'
import TopBar from './TopBar/TopBar'
import MessagesArea from './MessagesArea/MessagesArea'
import BottomBar from './BottomArea/BottomArea'
import NoConvActive from '../Conversations/NoConvActive/NoConvActive'
import { socket } from '@/pages/_app'

interface ChatProps {
    conversationActive: string,
    showSearchConv: boolean,
    handleSearchConv: (e: React.ChangeEvent<HTMLInputElement>) => void,
    message: string,
    handleMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    sendMessage: Function,
    typingStatus: {},
    filesEmpty: boolean,
    deleteMessage: Function,
    handleReaction: Function,
    files: any[],
    setFiles: (files: any[]) => void,
    setFilesEmpty: (filesEmpty: boolean) => void,
}

const Chat = ({
    conversationActive,
    showSearchConv,
    handleSearchConv,
    message,
    handleMessageChange,
    sendMessage,
    typingStatus,
    filesEmpty,
    deleteMessage,
    handleReaction,
    files,
    setFiles,
    setFilesEmpty
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
                    <TopBar
                        name={conversationInfos.name}
                        pic={conversationInfos.pic}
                        status={conversationInfos.status}
                        handleSearchConv={handleSearchConv}
                        showSearchConv={showSearchConv}
                    />

                    <MessagesArea
                        showSearchConv={showSearchConv}
                        messages={messages}
                        messagesCount={messages.length}
                        filesEmpty={filesEmpty}
                        deleteMessage={deleteMessage}
                        handleReaction={handleReaction}
                    />

                    <BottomBar
                        conversationActive={conversationActive}
                        message={message}
                        handleMessageChange={handleMessageChange}
                        sendMessage={sendMessage}
                        typingStatus={typingStatus}
                        name={conversationInfos.name}
                        filesEmpty={filesEmpty}
                        setFilesEmpty={setFilesEmpty}
                        files={files}
                        setFiles={setFiles}
                    />
                </>
            ) : (
                <NoConvActive />
            )}
        </div>
    )
}

export default Chat