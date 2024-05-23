import React, { useState, KeyboardEvent } from 'react'
import Picker from 'emoji-picker-react'
import { handleContextMenu, handleMouseDown, handleMouseUp } from '../../Functions/Message/Message'
import styles from './style.module.scss'
import { ContextMenu } from './ContextMenu'
import { decodeToken } from 'react-jwt'
import { socket } from '@/pages/_app'
import { useCookie } from '@/hooks/useCookie/useCookie'
import Content from './Content'
import EditMessage from './EditMessage'

interface MessageProps {
    message: message,
    i: number,
    scrollBottomRef: any,
    topRounded: boolean,
    bottomRounded: boolean,
    messagesCount: number,
    deleteMessage: Function,
    conversationActive: string,
    isNextMessageSameSender: boolean,
    pic: string
}

const Message = ({
    message,
    i,
    scrollBottomRef,
    bottomRounded,
    topRounded,
    messagesCount,
    deleteMessage,
    conversationActive,
    isNextMessageSameSender,
    pic
}: MessageProps) => {

    const { cookies } = useCookie()

    const [rightClick, setRightClick] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [longPress, setLongPress] = useState<number | null>(null)

    let userId = ""
    if (typeof window !== 'undefined') {
        const token: User | null = decodeToken(localStorage.getItem('user') as string)
        userId = token?.userId as string
    }

    const isReceived = message.sender_id !== userId
    const messageClass = isReceived ? styles.messagereceived : styles.messagesent
    const firstPlan = rightClick ? styles.messagefirstplan : ''
    const topClass = isReceived ? (topRounded ? styles.messagereceivedtop : styles.messagereceivedmiddle) : (topRounded ? styles.messagesenttop : styles.messagesentmiddle)
    const bottomClass = isReceived ? (bottomRounded ? styles.messagereceivedbottom : '') : (bottomRounded ? styles.messagesentbottom : '');
    const hasReactions = message.reactions && message.reactions.length > 0 ? styles.hasReactions : ''

    const handleEscape = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
            setRightClick(false)
        }
    }

    const handleReaction = (message_id: string, reaction_id: string) => {
        socket.emit('reaction', { cookies, message_id, reaction_id, conversationActive })
    }

    socket.on('reaction', (data: any) => {
        if (data.reacted) {
            socket.emit('conversationmessages', { cookies, conversation_id: conversationActive })
        }
    })

    return (
        <>
            {editMode ?
                <EditMessage
                    message={message}
                    setEditMode={setEditMode}
                    editMode={editMode}
                    conversationActive={conversationActive}
                />
                :
                <div className={styles.message + " " + firstPlan + " " + hasReactions}
                    ref={i === messagesCount - 1 ? scrollBottomRef : null}
                    onContextMenu={(e) => handleContextMenu(e, setRightClick)}
                    onClick={(e) => e.detail === 2 ? handleReaction(message._id, "2764-fe0f") : null}
                    onMouseDown={() => handleMouseDown(setRightClick, setLongPress)}
                    onMouseUp={() => handleMouseUp(longPress, setLongPress)}
                    onMouseLeave={() => handleMouseUp(longPress, setLongPress)}
                    onKeyDown={handleEscape}
                    role='button'
                    >
                    {rightClick && <Picker reactionsDefaultOpen={true} className={styles.reactiondiv + " " + (isReceived ? styles.messagecontextmenureceived : styles.messagecontextmenusent)}
                        onEmojiClick={(emoji: EmojiPickerProps) => { handleReaction(message._id, emoji.unified); setRightClick(false); }}
                    />}

                    <Content
                        message={message}
                        isNextMessageSameSender={isNextMessageSameSender}
                        pic={pic}
                        handleReaction={handleReaction}
                        isReceived={isReceived}
                        messageClass={messageClass}
                        topClass={topClass}
                        bottomClass={bottomClass}
                    />

                    <ContextMenu
                        message={message}
                        userId={userId}
                        deleteMessage={deleteMessage}
                        isReceived={isReceived}
                        rightClick={rightClick}
                        setRightClick={setRightClick}
                        setEditMode={setEditMode}
                        editMode={editMode}
                    />
                </div>
            }
        </>
    )
}

export default Message
