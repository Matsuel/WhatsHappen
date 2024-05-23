import React, { MutableRefObject } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import Pinned from '@/assets/Pinned.svg';
import Bin from '@/assets/Bin.svg';
import { socket } from '@/pages/_app';
import { useClickAway } from '@uidotdev/usehooks';
import { useCookie } from '@/hooks/useCookie/useCookie'

interface ContextMenuConversationProps {
    conversationId: string,
    points: { x: number, y: number },
    setContextMenu: Function,
    setConversationPinned: Function,
    pin: boolean
}

const ContextMenuConversation = ({
    conversationId,
    points,
    setContextMenu,
    setConversationPinned,
    pin
}: ContextMenuConversationProps) => {

    const { cookies } = useCookie()

    const ref = useClickAway(() => {
        setContextMenu(false)
        setConversationPinned("")
    }) as MutableRefObject<HTMLDivElement>;

    const handlePinnedConversation = (conversation_id: string) => {
        setContextMenu(false)
        setConversationPinned("")
        socket.emit('pinconversation', { cookies, conversation_id })
    }

    const items = [
        {
            label: pin ? 'Détacher' : 'Épingler',
            onClick: () => handlePinnedConversation(conversationId),
            color: '#000000',
            icon: Pinned
        },
        {
            label: 'Supprimer',
            onClick: () => console.log('delete'),
            color: '#FF0000',
            icon: Bin
        }
    ]

    return (
        <div
            className={styles.contextMenu}
            style={{ top: points.y, left: points.x }}
            ref={ref}
        >
            {items.map((item) => (
                <button
                    className={styles.contextMenuItem}
                    onClick={item.onClick}
                    style={{ color: item.color }}
                >
                    <p className={styles.contextMenuLabel}>{item.label}</p>
                    <Image
                        src={item.icon}
                        alt="icon"
                        className={styles.contextMenuIcon}
                        width={0}
                        height={0}
                    />
                </button>
            ))}
        </div>
    )
};

export default ContextMenuConversation;
