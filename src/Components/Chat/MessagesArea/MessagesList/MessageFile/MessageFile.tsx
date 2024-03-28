import React, { useState } from 'react'
import styles from './MessageFile.module.css'
import { FileIcon, defaultStyles } from 'react-file-icon'
import Download from '../../../../../assets/Download.svg'
import { decodeToken } from 'react-jwt';

import { handleContextMenu, downloadFile  } from '../../../../../Functions/Message/Message'
import Image from 'next/image'

interface MessageFileProps {
    message: message,
    i: number,
    scrollBottomRef: any,
    topRounded: boolean,
    bottomRounded: boolean,
    messagesCount: number,
    deleteMessage: Function,
}

const MessageFile = ({ message, i, scrollBottomRef, bottomRounded, topRounded, messagesCount, deleteMessage }: MessageFileProps) => {

    const [rightClick, setRightClick] = useState<boolean>(false)

    let userId = ""
    if (typeof window !== 'undefined') {
        const token: User | null = decodeToken(localStorage.getItem('user') as string)
        userId = token?.userId as string
    }

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
            </div>
        </>
    )
}

export default MessageFile