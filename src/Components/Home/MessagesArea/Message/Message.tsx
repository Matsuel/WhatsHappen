import React, { useState } from 'react'

import './Message.css'
import { ContextMenuMessage, ContextMenuMessageButton } from '../ContextMenuMessage/ContextMenuMessage'

const Message = ({ message, userId, i, scrollBottomRef, bottomRounded, topRounded, messagesCount, deleteMessage }: MessageProps) => {

    const [rightClick, setRightClick] = useState<boolean>(false)

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setRightClick(true)
    }

    const copyContentToClipboard = (content : string) => {
        navigator.clipboard.writeText(content)
    }

    const isReceived = message.sender_id !== userId

    const messageClass = isReceived ? 'messagereceived' : 'messagesent'
    const firstPlan = rightClick ? 'messagefirstplan' : ''
    const topClass = isReceived ? (topRounded ? 'messagereceivedtop' : 'messagereceivedmiddle') : (topRounded ? 'messagesenttop' : 'messagesentmiddle');
    const bottomClass = isReceived ? (bottomRounded ? 'messagereceivedbottom' : '') : (bottomRounded ? 'messagesentbottom' : '');

    return (
        <>
            {rightClick &&
                <ContextMenuMessage setRightClick={setRightClick} />
            }
            <div className={`message ${firstPlan}`} ref={i === messagesCount - 1 ? scrollBottomRef : null} onContextMenu={(e) => handleContextMenu(e)}>
                <div className={`${messageClass} ${topClass} ${bottomClass}`} key={message._id}>
                    <p className='messagecontent'>
                        {message.content}
                    </p>
                    <p className='messagetime'>
                        {new Date(message.date).getHours()}:
                        {new Date(message.date).getMinutes().toString().padStart(2, '0')}
                    </p>
                </div>
                {rightClick &&
                    <ContextMenuMessageButton message={message} userId={userId} copyContentToClipboard={copyContentToClipboard} deleteMessage={deleteMessage} isReceived={isReceived} />
                }
            </div>
        </>
    )
}

export default Message
