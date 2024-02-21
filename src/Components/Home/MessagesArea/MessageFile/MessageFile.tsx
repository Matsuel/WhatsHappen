import React, { useState } from 'react'
import "./MessageFile.css"
import { FileIcon, defaultStyles } from 'react-file-icon'
import Download from '../../../../assets/Download.svg'
import Cross from '../../../../assets/cross.svg'
import { ContextMenuMessage, ContextMenuMessageButton } from '../ContextMenuMessage/ContextMenuMessage'

const MessageFile = ({ message, userId, i, scrollBottomRef, bottomRounded, topRounded, messagesCount, deleteMessage, showSearchConv }: MessageFileProps) => {

    const [rightClick, setRightClick] = useState<boolean>(false)

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setRightClick(true)
    }

    const isReceived = message.sender_id !== userId

    const fileClass = isReceived ? 'filereceived' : 'filesent'
    const firstPlan = rightClick ? 'messagefirstplan' : ''
    const topClass = isReceived ? (topRounded ? 'filereceivedtop' : 'filereceivedmiddle') : (topRounded ? 'filesenttop' : 'filesentmiddle');
    const bottomClass = isReceived ? (bottomRounded ? 'filereceivedbottom' : '') : (bottomRounded ? 'filesentbottom' : '');

    const downloadFile = (message: message) => {
        const arrayBuffer = new Blob([message.fileContent], { type: message.fileType })
        const fileUrl = URL.createObjectURL(arrayBuffer)
        const a = document.createElement("a")
        a.href = fileUrl
        a.download = message.fileName
        a.click()

        URL.revokeObjectURL(fileUrl)
    }


    return (
        <>
            {rightClick &&
                <ContextMenuMessage setRightClick={setRightClick} showSearchConv={showSearchConv} />
            }
            <div className={`fileelement ${firstPlan}`} ref={i === messagesCount - 1 ? scrollBottomRef : null} onContextMenu={(e) => handleContextMenu(e)}>

                <div className={`${fileClass} ${topClass} ${bottomClass}`} key={message._id}>
                    <img src={Download} alt="Download" className="download" onClick={() => downloadFile(message)} />
                    <p className="filename">{message.fileName}</p>
                    <div className="fileicon">
                        <FileIcon extension={message.fileExtension} {...defaultStyles[message.fileExtension as keyof typeof defaultStyles]} />
                    </div>

                </div>
                {rightClick &&
                    <ContextMenuMessageButton message={message} userId={userId} copyContentToClipboard={() => { }} deleteMessage={deleteMessage} isReceived={isReceived} />
                }

            </div>
        </>
    )
}

export default MessageFile