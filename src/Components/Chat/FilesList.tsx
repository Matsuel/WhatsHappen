import React from 'react'
import styles from './style.module.css'
import Bottombar from './InputBar'
import File from '../File/File'

interface FilesListProps {
    conversationActive: string,
    message: string,
    handleMessageChange: Function,
    sendMessage: Function,
    name: string,
}

const FilesList = ({
    conversationActive,
    message,
    handleMessageChange,
    sendMessage,
    name,
}: FilesListProps) => {

    return (
        <div className={styles.bottomArea}>

            <Bottombar
                conversationActive={conversationActive}
                message={message}
                handleMessageChange={handleMessageChange}
                sendMessage={sendMessage}
            />
        </div>
    )
}

export default FilesList
