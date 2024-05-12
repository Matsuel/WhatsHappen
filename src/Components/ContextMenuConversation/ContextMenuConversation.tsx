import React from 'react';

import styles from './ContextMenuConversation.module.scss';
import Image from 'next/image';
import { decodeToken } from 'react-jwt';
import Pinned from '@/assets/Pinned.svg';
import Bin from '@/assets/Bin.svg';
import { socket } from '@/pages/_app';

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
    let cookies = ""
    let userId = ""
    if (typeof window !== 'undefined') {
        cookies = localStorage.getItem('user') || ''
        const token: User | null = decodeToken(cookies)
        userId = token?.userId as string
    }

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
        >
            {items.map((item) => (
                <div
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
                </div>
            ))}
        </div>
    )
};

export default ContextMenuConversation;
