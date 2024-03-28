import React from 'react'
import styles from './Chat.module.css'
import TopBar from './TopBar/TopBar'
import MessagesArea from './MessagesArea/MessagesArea'
import BottomBar from './BottomArea/BottomArea'
import NoConvActive from '../Conversations/NoConvActive/NoConvActive'

interface ChatProps {
    conversationActive: string,
    conversationInfos: {
        name: string,
        pic: string,
        status: boolean
    },
    messages: any[],
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
    showFullSidebar: boolean,
}

const Chat = ({ conversationActive, conversationInfos, messages, showSearchConv, handleSearchConv, message, handleMessageChange, sendMessage, typingStatus, filesEmpty, deleteMessage, handleReaction, files, setFiles, setFilesEmpty, showFullSidebar }: ChatProps) => {
    return (
        <div className={showFullSidebar ? styles.messagessection : styles.messagessectionMaximized}>
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