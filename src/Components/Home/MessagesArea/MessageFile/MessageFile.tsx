import React from 'react'
import "./MessageFile.css"
import { FileIcon, defaultStyles } from 'react-file-icon'
import Download from '../../../../assets/download.svg'

const MessageFile = ({ message, userId, i, scrollBottomRef, bottomRounded, topRounded, messagesCount }: any) => {

    const isReceived = message.sender_id !== userId

    const messageClass = isReceived ? 'messagereceived' : 'messagesent'
    const topClass = isReceived ? (topRounded ? 'messagereceivedtop' : 'messagereceivedmiddle') : (topRounded ? 'messagesenttop' : 'messagesentmiddle');
    const bottomClass = isReceived ? (bottomRounded ? 'messagereceivedbottom' : '') : (bottomRounded ? 'messagesentbottom' : '');

    const downloadFile = (message : message) => {
        const arrayBuffer = new Blob([message.fileContent], { type: message.fileType })
        const fileUrl = URL.createObjectURL(arrayBuffer)
        const a = document.createElement("a")
        a.href = fileUrl
        a.download = message.fileName
        a.click()

        URL.revokeObjectURL(fileUrl)
    }

    
    return (
        <div className={`message ${messageClass}`} ref={i === messagesCount - 1 ? scrollBottomRef : null} >

            <div className={`${messageClass} ${topClass} ${bottomClass}`} key={message._id}>
                <p className="filename">{message.fileName}</p>
                <div className="fileicon">
                    <FileIcon extension={message.fileExtension} {...defaultStyles[message.fileExtension as keyof typeof defaultStyles]} />
                </div>
                <img src={Download} alt="" className="trashfile" onClick={() => downloadFile(message)} />

            </div>

        </div>
    )
}

export default MessageFile