import React, { useState } from 'react'
import styles from './style.module.scss'
import Pin from '@/assets/Pin.svg'
import Bin from '@/assets/Bin.svg'
import Edit from '@/assets/Edit.svg'
import Copy from '@/assets/Copy.svg'
import { copyContentToClipboard } from '../../Functions/ContextMenu/ContextMenu'
import Image, { ImageProps } from 'next/image'
import { useClickAway } from '@uidotdev/usehooks'
import EmojiPicker, { Emoji } from 'emoji-picker-react'
import { socket } from '@/pages/_app'
import { useCookie } from '@/hooks/useCookie/useCookie'

interface ContextMenuProps {
    message: message,
    userId: string,
    deleteMessage: Function,
    isReceived: boolean,
    rightClick: boolean,
    setRightClick: Function,
    setEditMode: Function,
    editMode: boolean,
    points: { x: number, y: number },
    conversationActive: string
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
    editMode,
    points,
    conversationActive
}: ContextMenuProps) => {

    const { cookies } = useCookie()
    const emojis = ["2764-fe0f", "1f604", "1f44c", "1f602"]
    const [showPicker, setShowPicker] = useState<boolean>(false)

    const Buttons: Button[] = [
        {
            title: "Copier",
            icon: Copy,
            action: () => { copyContentToClipboard(message.content); setRightClick(false); },
            canSee: message.type === "text"
        },
        {
            title: "Plus de réactions",
            icon: Pin,
            action: () => setShowPicker(!showPicker),
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

    const ref = useClickAway((event) => {
        if (ref.current && ref.current.contains(event.target as Node)) {
            return
        }
        setRightClick(false)
    }) as React.MutableRefObject<HTMLDivElement>;


    const handleReaction = (message_id: string, reaction_id: string) => {
        socket.emit('reaction', { cookies, message_id, reaction_id, conversationActive })
        setRightClick(false)
    }

    return (
        <>
            {rightClick &&
                <div
                    style={{ top: points.y - 30, left: points.x - 320 }}
                    className={styles.messagecontextmenu}
                    ref={ref}
                >
                    <div className={styles.contextReactions}>
                        {emojis.map((emoji, i) => (
                            <button
                                key={emoji}
                                className={styles.contextEmoji}
                                onClick={() => handleReaction(message._id, emoji)}
                            >
                                <Emoji
                                    unified={emoji}
                                    size={25}
                                />
                            </button>
                        ))}
                    </div>
                    {Buttons.map((button, i) => (
                        <Button
                            key={button.title}
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
                <button
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

                </button>
            }
        </>
    )
}

export { ContextMenu }