import React from 'react'

import styles from './style.module.css'
import IsTyping from '../IsTyping/IsTyping'
import Bottombar from './InputBar'
import File from '../File/File'

interface FilesListProps {
    conversationActive: string,
    message: string,
    handleMessageChange: Function,
    sendMessage: Function,
    typingStatus: Object,
    name: string,
    filesEmpty: boolean,
    setFilesEmpty: Function,
    files: FileInfos[],
    setFiles: Function,
}

const FilesList = ({
    conversationActive,
    message,
    handleMessageChange,
    sendMessage,
    typingStatus,
    name,
    filesEmpty,
    setFilesEmpty,
    files,
    setFiles
}: FilesListProps) => {

    return (
        <div className={styles.bottomArea}>
            <IsTyping conversationActive={conversationActive} typingStatus={typingStatus} name={name} />

            {files.length > 0 ? (
                <div className={styles.fileslist}>
                    {
                        files.map((file, index) => {
                            return (
                                <File key={index} file={file} index={index} setFiles={setFiles} files={files} setFilesEmpty={setFilesEmpty} />
                            )
                        })
                    }
                </div>
            ) : null}

            <Bottombar conversationActive={conversationActive} message={message} handleMessageChange={handleMessageChange} sendMessage={sendMessage} files={files} setFiles={setFiles} setFilesEmpty={setFilesEmpty} />
        </div>
    )
}

export default FilesList
