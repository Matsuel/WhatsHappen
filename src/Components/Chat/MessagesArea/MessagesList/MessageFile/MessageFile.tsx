import React, { useState } from 'react'
import styles from './MessageFile.module.css'
import { FileIcon, defaultStyles } from 'react-file-icon'
import Download from '../../../../../assets/Download.svg'
import { ContextMenuMessageButton } from '../ContextMenu/ContextMenu'
import { handleContextMenu, downloadFile  } from '../../../../../Functions/Message/Message'
import Image from 'next/image'

interface MessageFileProps {
    message: message,
    userId: string,
    i: number,
    scrollBottomRef: any,
    topRounded: boolean,
    bottomRounded: boolean,
    messagesCount: number,
    deleteMessage: Function,
    showSearchConv: boolean,
}

const MessageFile = ({ message, userId, i, scrollBottomRef, bottomRounded, topRounded, messagesCount, deleteMessage, showSearchConv }: MessageFileProps) => {

    const [rightClick, setRightClick] = useState<boolean>(false)

    const isReceived = message.sender_id !== userId

    const fileClass = isReceived ? styles.filereceived : styles.filesent
    const firstPlan = rightClick ? styles.messagefirstplan : ''
    const topClass = isReceived ? (topRounded ? styles.filereceivedtop : styles.filereceivedmiddle) : (topRounded ? styles.filesenttop : styles.filesentmiddle)
    const bottomClass = isReceived ? (bottomRounded ? styles.filereceivedbottom : '') : (bottomRounded ? styles.filesentbottom : '');

    return (
        <>
        {/* Voir si je peux pas gérer la condition directement dans le composant */}

            <div className={styles.fileelement + " " + firstPlan} ref={i === messagesCount - 1 ? scrollBottomRef : null} onContextMenu={(e) => handleContextMenu(e, setRightClick)}>

                <div className={fileClass + " " + topClass + " " + bottomClass} key={message._id}>
                    <Image src={Download} alt="Download" className={styles.download} onClick={() => downloadFile(message)} />
                    <p className={styles.filename}>{message.fileName}</p>
                    <div className={styles.fileicon}>
                        <FileIcon extension={message.fileExtension} {...defaultStyles[message.fileExtension as keyof typeof defaultStyles]} />
                    </div>

                </div>

                {/* Voir si je peux pas gérer la condition directement dans le composant */}
                {rightClick &&
                    <ContextMenuMessageButton message={message} userId={userId} deleteMessage={deleteMessage} isReceived={isReceived} />
                }

            </div>
        </>
    )
}

export default MessageFile