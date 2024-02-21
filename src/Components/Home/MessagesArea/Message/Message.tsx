import React, { useState } from 'react'
import Cross from '../../../../assets/cross.svg'

import './Message.css'

const Message = ({ message, userId, i, scrollBottomRef, bottomRounded, topRounded, messagesCount, deleteMessage }: MessageProps) => {

    const [rightClick, setRightClick] = useState(false)

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
                <div className="messagecontextblur">
                    <img src={Cross} alt="cross" className="cross" onClick={() => setRightClick(false)} />


                </div>
            }
            <div className="message" ref={i === messagesCount - 1 ? scrollBottomRef : null} onContextMenu={(e) => handleContextMenu(e)}>
                <div className={`${messageClass} ${topClass} ${bottomClass} ${firstPlan}`} key={message._id}>
                    <p className='messagecontent'>
                        {message.content}
                    </p>
                    <p className='messagetime'>
                        {new Date(message.date).getHours()}:
                        {new Date(message.date).getMinutes().toString().padStart(2, '0')}
                    </p>
                </div>
                {rightClick &&
                    <div className={`messagecontextmenu ${isReceived ? "messagecontextmenureceived" : "messagecontextmenusent"}`}>
                        <div className="messagecontextitem" onClick={() => copyContentToClipboard(message.content)}>
                            Copier
                        </div>
                        <div className="messagecontextitem" onClick={() => deleteMessage(message._id)}>
                            Supprimer le message
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Message
