import React, { LegacyRef, MutableRefObject, useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'
import { socket } from '@/pages/_app'
import { useCookie } from '@/hooks/useCookie/useCookie'
import { useClickAway } from '@uidotdev/usehooks'

interface EditMessageProps {
    message: message,
    setEditMode: Function,
    editMode: boolean,
    conversationActive: string
}

const EditMessage = ({
    message,
    setEditMode,
    editMode,
    conversationActive
}: EditMessageProps) => {

    const { cookies } = useCookie()

    const [newMessage, setNewMessage] = useState<string>(message.content)
    const ref = useRef<HTMLInputElement>(null)

    const refAway = useClickAway((event) => {
        if (ref.current?.contains(event.target as Node)) {
            return
        }
        setEditMode(false)
    }) as LegacyRef<HTMLInputElement>

    const editMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newMessage !== message.content && newMessage.length > 0 && newMessage.trim().length > 0) {
            socket.emit('editMessage', { cookies: cookies, message_id: message._id, content: newMessage, conversation_id: conversationActive })
            setEditMode(false)
        }
    }

    useEffect(() => {
        if (editMode) {
            (refAway as MutableRefObject<HTMLInputElement | null>).current?.focus()
        }
    }, [editMode])

    return (
        <div
            ref={ref}
            className={styles.editMessageWrap}
        >
            <input
                type="text"
                className={[
                    styles.editMessageInput
                ].join(' ')}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                ref={refAway}
                onKeyDown={(e) => editMessage(e)}
            />
        </div>
    )
}

export default EditMessage