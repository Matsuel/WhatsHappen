import React, { useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'
import { socket } from '@/pages/_app'
import { useCookie } from '@/hooks/useCookie/useCookie'

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

    const editMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newMessage !== message.content && newMessage.length > 0 && newMessage.trim().length > 0) {
            socket.emit('editMessage', { cookies: cookies, message_id: message._id, content: newMessage, conversation_id: conversationActive })
            setEditMode(false)
        }
    }

    useEffect(() => {
        if (editMode) {
            ref.current?.focus()
        }
        console.log(message._id)
    }, [editMode])

    return (
        <input
            type="text"
            className={[
                // styles.message,
                styles.editMessageInput

            ].join(' ')}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            ref={ref}
            onKeyDown={(e) => editMessage(e)}
        />
    )
}

export default EditMessage