import React, { useState } from 'react'
import './ContextMenuMessage.css'
import Cross from '../../../../assets/cross.svg'
import Trash from '../../../../assets/Trash.svg'
import Copy from '../../../../assets/Copy.svg'
import CopyDone from '../../../../assets/CopyDone.svg'

const ContextMenuMessage = ({ setRightClick, showSearchConv }: { setRightClick: Function, showSearchConv: boolean }) => {
    return (
        <div className={`messagecontextblur ${showSearchConv ? "messagecontextblurmedium" : "messagecontextblurfull"}`}>
            <img src={Cross} alt="cross" className="cross" onClick={() => setRightClick(false)} />
        </div>
    )
}

const ContextMenuMessageButton = ({ message, userId, deleteMessage, isReceived }: { message: message, userId: string, deleteMessage: Function, isReceived: boolean }) => {
    const [copyDone, setCopyDone] = useState<boolean>(false)

    const copyContentToClipboard = (content: string) => {
        setCopyDone(true)
        navigator.clipboard.writeText(content)
        setTimeout(() => {
            setCopyDone(false)
        }, 1500)
    }


    return (
        <div className={`messagecontextmenu ${isReceived ? "messagecontextmenureceived" : "messagecontextmenusent"}`}>
            {message.type === "text" &&
            <div className="messagecontextitem" onClick={() => copyContentToClipboard(message.content)}>
                Copier
                <img src={copyDone ? CopyDone : Copy} alt="copy" className="copy" />
            </div>
            }
            {message.sender_id === userId &&
                <div className="messagecontextitem" onClick={() => deleteMessage(message._id)}>
                    Supprimer le message
                    <img src={Trash} alt="trash" className="trash" />
                </div>
            }
        </div>
    )
}

export { ContextMenuMessageButton,ContextMenuMessage }