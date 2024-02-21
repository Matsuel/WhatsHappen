import React from 'react'
import './ContextMenuMessage.css'
import Cross from '../../../../assets/cross.svg'

const ContextMenuMessage = ({ setRightClick }: { setRightClick: Function }) => {
    return (
        <div className="messagecontextblur">
            <img src={Cross} alt="cross" className="cross" onClick={() => setRightClick(false)} />
        </div>
    )
}

const ContextMenuMessageButton = ({ message, userId, copyContentToClipboard, deleteMessage, isReceived }: { message: message, userId: string, copyContentToClipboard: Function, deleteMessage: Function, isReceived: boolean }) => {
    return (
        <div className={`messagecontextmenu ${isReceived ? "messagecontextmenureceived" : "messagecontextmenusent"}`}>
            <div className="messagecontextitem" onClick={() => copyContentToClipboard(message.content)}>
                Copier
            </div>
            {message.sender_id === userId &&
                <div className="messagecontextitem" onClick={() => deleteMessage(message._id)}>
                    Supprimer le message
                </div>
            }
        </div>
    )
}

export { ContextMenuMessageButton,ContextMenuMessage }