import React from 'react';

import styles from './Conversation.module.scss';
import { socket } from '@/pages/_app';
import { decodeToken } from 'react-jwt';
import Pin from '@/assets/Pin.svg';
import Bin from '@/assets/Bin.svg';
import Image from 'next/image';

interface ContextConversationProps {
    conversationId: string,
    points: { x: number, y: number },
}

const ContextConversation = ({
    conversationId,
    points
}: ContextConversationProps) => {

    let cookies = ""
    let userId = ""
    if (typeof window !== 'undefined') {
        cookies = localStorage.getItem('user') || ''
        const token: User | null = decodeToken(cookies)
        userId = token?.userId as string
    }

    const handlePinnedConversation = (conversation_id: string) => {
        socket.emit('pinconversation', { cookies, conversation_id })
    }

    const items = [
        {
            label: 'Épingler',
            onClick: () => handlePinnedConversation(conversationId),
            color: '#000000',
            icon: Pin
        },
        {
            label: 'Supprimer',
            onClick: () => {
                console.log('delete')
            },
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
    );
};

export default ContextConversation;
