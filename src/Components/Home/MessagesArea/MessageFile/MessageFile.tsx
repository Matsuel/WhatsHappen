import React from 'react'
import "./MessageFile.css"
import { FileIcon, defaultStyles } from 'react-file-icon'
import Download from '../../../../assets/Download.svg'

const MessageFile = ({ message, userId, i, scrollBottomRef, bottomRounded, topRounded, messagesCount }: any) => {

    const isReceived = message.sender_id !== userId

    const fileClass = isReceived ? 'filereceived' : 'filesent'
    const topClass = isReceived ? (topRounded ? 'filereceivedtop' : 'filereceivedmiddle') : (topRounded ? 'filesenttop' : 'filesentmiddle');
    const bottomClass = isReceived ? (bottomRounded ? 'filereceivedbottom' : '') : (bottomRounded ? 'filesentbottom' : '');

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
        <div className={`fileelement`} ref={i === messagesCount - 1 ? scrollBottomRef : null} >

            <div className={`${fileClass} ${topClass} ${bottomClass}`} key={message._id}>
                <img src={Download} alt="Download" className="download" onClick={() => downloadFile(message)} />
                <p className="filename">{message.fileName}</p>
                <div className="fileicon">
                    <FileIcon extension={message.fileExtension} {...defaultStyles[message.fileExtension as keyof typeof defaultStyles]} />
                </div>

            </div>

        </div>
    )
}

export default MessageFile