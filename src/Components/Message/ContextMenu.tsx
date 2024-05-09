import React from 'react'
import styles from './style.module.scss'
import Pin from '@/assets/Pin.svg'
import { copyContentToClipboard } from '../../Functions/ContextMenu/ContextMenu'
import Image from 'next/image'
import { faPenToSquare, faCopy, faTrashCan, IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ContextMenuProps {
    message: message,
    userId: string,
    deleteMessage: Function,
    isReceived: boolean,
    rightClick: boolean,
    setRightClick: Function
}

interface Button {
    title: string,
    icon: IconDefinition | any,
    action: Function,
    canSee: boolean,
    index?: number
}

const ContextMenu = ({
    message,
    userId,
    deleteMessage,
    isReceived,
    rightClick,
    setRightClick
}: ContextMenuProps) => {

    const Buttons: Button[] = [
        {
            title: "Copier",
            icon: faCopy,
            action: () => { copyContentToClipboard(message.content); setRightClick(false); },
            canSee: message.type === "text"
        },
        {
            title: "Supprimer",
            icon: faTrashCan,
            action: () => { deleteMessage(message._id); setRightClick(false); },
            canSee: message.sender_id === userId
        },
        {
            title: "Modifier",
            icon: faPenToSquare,
            action: () => { console.log("modifier"); setRightClick(false); },
            canSee: message.sender_id === userId
        },
        {
            title: "Épingler",
            icon: Pin,
            action: () => { console.log("épingler"); setRightClick(false); },
            canSee: message.type === "text"
        }
    ]

    return (
        <>
            {rightClick &&
                <div className={styles.messagecontextmenu + " " + (isReceived ? styles.messagecontextmenureceived : styles.messagecontextmenusent)}>
                    {Buttons.map((button, i) => (
                        <Button key={i} title={button.title} icon={button.icon} action={button.action} canSee={button.canSee} index={i} />
                    ))}
                </div>
            }
        </>
    )
}

const Button = ({ title, icon, action, canSee, index }: Button) => {
    return (
        <>
            {canSee &&
                <div className={styles.messagecontextitem} onClick={() => action()}>
                    <div className={styles.contexttitle}>
                        {title}
                    </div>
                    {index === 3 ? (
                        <Image src={icon.src} alt={title} width={20} height={20} />
                    ) : (
                        <FontAwesomeIcon icon={icon} />
                    )}

                </div>
            }
        </>
    )
}

export { ContextMenu }