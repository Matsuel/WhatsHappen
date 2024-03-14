import React from 'react'

import styles from './BottomArea.module.css'
import IsTyping from '../../IsTyping/IsTyping'
import FilesList from './FilesList/FilesList'
import Bottombar from '../Bottombar/Bottombar'

const BottomArea = ({ conversationActive, message, handleMessageChange, sendMessage, typingStatus, name, filesEmpty, setFilesEmpty, files, setFiles }: BottomBarProps) => {

    return (
        <div className={styles.bottomArea}>
            <IsTyping conversationActive={conversationActive} typingStatus={typingStatus} name={name} />

            <FilesList files={files} setFiles={setFiles} setFilesEmpty={setFilesEmpty} />

            <Bottombar conversationActive={conversationActive} message={message} handleMessageChange={handleMessageChange} sendMessage={sendMessage} files={files} setFiles={setFiles} setFilesEmpty={setFilesEmpty} />
        </div>
    )
}

export default BottomArea
