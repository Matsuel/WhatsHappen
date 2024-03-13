import React, { useState } from 'react'
import "./MessageFile.css"
import { FileIcon, defaultStyles } from 'react-file-icon'
import Download from '../../../../../assets/Download.svg'
import Cross from '../../../../../assets/cross.svg'
import { ContextMenuMessage, ContextMenuMessageButton } from '../ContextMenuMessage/ContextMenuMessage'
import { handleContextMenu, downloadFile  } from '../../../../../Functions/Message/Message'

const MessageFile = ({ message, userId, i, scrollBottomRef, bottomRounded, topRounded, messagesCount, deleteMessage, showSearchConv }: MessageFileProps) => {

    const [rightClick, setRightClick] = useState<boolean>(false)

    const isReceived = message.sender_id !== userId

    const fileClass = isReceived ? 'filereceived' : 'filesent'
    const firstPlan = rightClick ? 'messagefirstplan' : ''
    const topClass = isReceived ? (topRounded ? 'filereceivedtop' : 'filereceivedmiddle') : (topRounded ? 'filesenttop' : 'filesentmiddle');
    const bottomClass = isReceived ? (bottomRounded ? 'filereceivedbottom' : '') : (bottomRounded ? 'filesentbottom' : '');

    return (
        <>
        {/* Voir si je peux pas gérer la condition directement dans le composant */}
            {rightClick &&
                <ContextMenuMessage setRightClick={setRightClick} showSearchConv={showSearchConv} />
            }

            {/* Composant message file */}
            <div className={`fileelement ${firstPlan}`} ref={i === messagesCount - 1 ? scrollBottomRef : null} onContextMenu={(e) => handleContextMenu(e, setRightClick)}>

                <div className={`${fileClass} ${topClass} ${bottomClass}`} key={message._id}>
                    <img src={Download} alt="Download" className="download" onClick={() => downloadFile(message)} />
                    <p className="filename">{message.fileName}</p>
                    <div className="fileicon">
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