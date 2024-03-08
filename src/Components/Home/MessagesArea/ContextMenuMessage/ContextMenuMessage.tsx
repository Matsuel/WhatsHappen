import React, { useState } from 'react'
import './ContextMenuMessage.css'
import Cross from '../../../../assets/cross.svg'
import Trash from '../../../../assets/Trash.svg'
import Copy from '../../../../assets/Copy.svg'
import CopyDone from '../../../../assets/CopyDone.svg'
import { copyContentToClipboard } from '../../../../Functions/ContextMenu/ContextMenu'

const ContextMenuMessage = ({ setRightClick, showSearchConv }: { setRightClick: Function, showSearchConv: boolean }) => {
    return (
        <div className={`messagecontextblur ${showSearchConv ? "messagecontextblurmedium" : "messagecontextblurfull"}`}>
            <img src={Cross} alt="cross" className="cross" onClick={() => setRightClick(false)} />
        </div>
    )
}

const ContextMenuMessageButton = ({ message, userId, deleteMessage, isReceived }: { message: message, userId: string, deleteMessage: Function, isReceived: boolean }) => {
    const [copyDone, setCopyDone] = useState<boolean>(false)


    return (
        <div className={`messagecontextmenu ${isReceived ? "messagecontextmenureceived" : "messagecontextmenusent"}`}>
            {/* Voir pour créer un composant ContextMenuMessageButton qui prend en paramètre message, userId, deleteMessage, isReceived, une couleur et une taille, une fonction on click s'il ya besoin */}
            {message.type === "text" &&
            <div className="messagecontextitem" onClick={() => copyContentToClipboard(message.content, setCopyDone)}>
                <div className="contexttitle">
                    Copier
                </div>
                <img src={copyDone ? CopyDone : Copy} alt="copy" className="contexticon" />
            </div>
            }
            {message.sender_id === userId &&
                <div className="messagecontextitem" onClick={() => deleteMessage(message._id)}>
                    <div className="contexttitle">
                        Supprimer
                    </div>
                    <img src={Trash} alt="trash" className="contexticon" />
                </div>
            }
        </div>
    )
}

export { ContextMenuMessageButton,ContextMenuMessage }