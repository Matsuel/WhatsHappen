import React, { useState } from 'react'
import styles from './ContextMenuMessage.module.css'
import Cross from '@/assets/cross.svg'
import Trash from '@/assets/Trash.svg'
import Copy from '@/assets/Copy.svg'
import CopyDone from '@/assets/CopyDone.svg'
import { copyContentToClipboard } from '../../../../../Functions/ContextMenu/ContextMenu'
import Image from 'next/image'

const ContextMenuMessage = ({ setRightClick, showSearchConv }: { setRightClick: Function, showSearchConv: boolean }) => {
    return (
        // <div className={`messagecontextblur ${showSearchConv ? "messagecontextblurmedium" : "messagecontextblurfull"}`}>
        <div className={styles.messagecontextblur + " " + (showSearchConv ? styles.messagecontextmenumedium : styles.messagecontextmenufull)}>
            <Image src={Cross} alt="cross" className={styles.cross} onClick={() => setRightClick(false)} />
        </div>
    )
}

const ContextMenuMessageButton = ({ message, userId, deleteMessage, isReceived }: { message: message, userId: string, deleteMessage: Function, isReceived: boolean }) => {
    const [copyDone, setCopyDone] = useState<boolean>(false)


    return (
        // <div className={`messagecontextmenu ${isReceived ? "messagecontextmenureceived" : "messagecontextmenusent"}`}>
        <div className={styles.messagecontextmenu + " " + (isReceived ? styles.messagecontextmenureceived : styles.messagecontextmenusent)}>
            {/* Voir pour créer un composant ContextMenuMessageButton qui prend en paramètre message, userId, deleteMessage, isReceived, une couleur et une taille, une fonction on click s'il ya besoin */}
            {message.type === "text" &&
            <div className={styles.messagecontextitem} onClick={() => copyContentToClipboard(message.content, setCopyDone)}>
                <div className={styles.contexttitle}>
                    Copier
                </div>
                <Image src={copyDone ? CopyDone : Copy} alt="copy" className={styles.contexticon} />
            </div>
            }
            {message.sender_id === userId &&
                <div className={styles.messagecontextitem} onClick={() => deleteMessage(message._id)}>
                    <div className={styles.contexttitle}>
                        Supprimer
                    </div>
                    <Image src={Trash} alt="trash" className={styles.contexticon} />
                </div>
            }
        </div>
    )
}

export { ContextMenuMessageButton,ContextMenuMessage }