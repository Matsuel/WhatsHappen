import React, { MutableRefObject } from 'react'
import styles from './style.module.scss'
import Pin from '@/assets/Pin.svg'
import Bin from '@/assets/Bin.svg'
import Edit from '@/assets/Edit.svg'
import Copy from '@/assets/Copy.svg'
import { copyContentToClipboard } from '../../Functions/ContextMenu/ContextMenu'
import Image, { ImageProps } from 'next/image'
import { useClickAway } from '@uidotdev/usehooks'

interface ContextMenuProps {
    message: message,
    userId: string,
    deleteMessage: Function,
    isReceived: boolean,
    rightClick: boolean,
    setRightClick: Function,
    setEditMode: Function,
    editMode: boolean
}

interface Button {
    title: string,
    icon: ImageProps,
    action: Function,
    canSee: boolean,
    color?: string
}

const ContextMenu = ({
    message,
    userId,
    deleteMessage,
    isReceived,
    rightClick,
    setRightClick,
    setEditMode,
    editMode
}: ContextMenuProps) => {

    const ref = useClickAway(()=>{
        setRightClick(false)
    }) as MutableRefObject<HTMLDivElement>;

    const Buttons: Button[] = [
        {
            title: "Copier",
            icon: Copy,
            action: () => { copyContentToClipboard(message.content); setRightClick(false); },
            canSee: message.type === "text"
        },
        {
            title: "Modifier",
            icon: Edit,
            action: () => { setEditMode(!editMode); setRightClick(false); },
            canSee: message.sender_id === userId
        },
        {
            title: "Épingler",
            icon: Pin,
            action: () => { console.log("épingler"); setRightClick(false); },
            canSee: message.type === "text"
        },
        {
            title: "Supprimer",
            icon: Bin,
            action: () => { deleteMessage(message._id); setRightClick(false); },
            canSee: message.sender_id === userId,
            color: "#FF0000"
        }
    ]

    return (
        <>
            {rightClick &&
                <div className={styles.messagecontextmenu + " " + (isReceived ? styles.messagecontextmenureceived : styles.messagecontextmenusent)}>
                    {Buttons.map((button, i) => (
                        <Button
                            key={i}
                            title={button.title}
                            icon={button.icon}
                            action={button.action}
                            canSee={button.canSee}
                            color={button.color as string}
                        />
                    ))}
                </div>
            }
        </>
    )
}

const Button = ({
    title,
    icon,
    action,
    canSee,
    color
}: Button) => {

    return (
        <>
            {canSee &&
                <div
                    className={styles.messagecontextitem}
                    onClick={() => action()}
                >
                    <div
                        style={{ color: color }}
                        className={styles.contexttitle}>
                        {title}
                    </div>
                    <Image
                        src={icon.src}
                        alt={title}
                        width={20}
                        height={20}
                    />

                </div>
            }
        </>
    )
}

export { ContextMenu }