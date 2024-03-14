import React from 'react'
import styles from './Chat.module.css'
import TopBar from './TopBar/TopBar'
import MessagesArea from './MessagesArea/MessagesArea'
import BottomBar from './BottomArea/BottomArea'
import NoConvActive from '../Conversations/NoConvActive/NoConvActive'

const Chat = ({ conversationActive, conversationInfos, messages, userId, scrollBottomRef, showSearchConv, handleSearchConv, message, handleMessageChange, sendMessage, typingStatus, filesEmpty, deleteMessage, handleReaction, files, setFiles, setFilesEmpty }: ChatProps) => {
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
                        userId={userId}
                        scrollBottomRef={scrollBottomRef}
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