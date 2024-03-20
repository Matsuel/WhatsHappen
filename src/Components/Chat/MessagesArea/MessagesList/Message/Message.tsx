import React, { useState, KeyboardEvent } from 'react'
import Picker, { Emoji } from 'emoji-picker-react'
import { handleContextMenu, handleMouseDown, handleMouseUp } from '../../../../../Functions/Message/Message'

import styles from './Message.module.css'
import { ContextMenu } from '../ContextMenu/ContextMenu'
import ShowDate from '../../../../Conversations/ConversationsList/Conversation/ShowDate/ShowDate'

interface MessageProps {
    message: message,
    userId: string,
    i: number,
    scrollBottomRef: any,
    topRounded: boolean,
    bottomRounded: boolean,
    messagesCount: number,
    deleteMessage: Function,
    showSearchConv: boolean,
    handleReaction: Function,
}

const Message = ({
    message,
    userId,
    i,
    scrollBottomRef,
    bottomRounded,
    topRounded,
    messagesCount,
    deleteMessage,
    showSearchConv,
    handleReaction
}: MessageProps) => {

    const [rightClick, setRightClick] = useState<boolean>(false)
    const [longPress, setLongPress] = useState<number | null>(null)

    const isReceived = message.sender_id !== userId
    const messageClass = isReceived ? styles.messagereceived : styles.messagesent
    const firstPlan = rightClick ? styles.messagefirstplan : ''
    const topClass = isReceived ? (topRounded ? styles.messagereceivedtop : styles.messagereceivedmiddle) : (topRounded ? styles.messagesenttop : styles.messagesentmiddle)
    const bottomClass = isReceived ? (bottomRounded ? styles.messagereceivedbottom : '') : (bottomRounded ? styles.messagesentbottom : '');

    const handleEscape = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
            setRightClick(false)
        }
    }

    return (
        <>
            <div className={styles.message + " " + firstPlan} ref={i === messagesCount - 1 ? scrollBottomRef : null} onContextMenu={(e) => handleContextMenu(e, setRightClick)}
                onClick={(e) => e.detail === 2 ? handleReaction(message._id, "2764-fe0f") : null}
                onMouseDown={() => handleMouseDown(setRightClick, setLongPress)}
                onMouseUp={() => handleMouseUp(longPress, setLongPress)}
                onMouseLeave={() => handleMouseUp(longPress, setLongPress)}
                onKeyDown={handleEscape}>
                {rightClick && <Picker reactionsDefaultOpen={true} className={styles.reactiondiv + " " + (isReceived ? styles.messagecontextmenureceived : styles.messagecontextmenusent)}
                    onEmojiClick={(emoji: EmojiPickerProps) => { handleReaction(message._id, emoji.unified); setRightClick(false); }}
                />}
                <div className={messageClass + " " + topClass + " " + bottomClass} key={message._id}>
                    <p className={styles.messagecontent}>
                        {message.content}
                    </p>
                    {
                        message.reactions && message.reactions.length > 0 &&

                        <div className={styles.reactions}>

                            {message.reactions.map((reaction, i) => {
                                const myReaction = reaction.user_id === userId

                                return (
                                    <div className={styles.reaction + " " + (myReaction ? styles.myReaction : "")} key={i} onClick={() => { handleReaction(message._id, reaction.reaction) }}>
                                        <Emoji unified={reaction.reaction} size={13} />
                                    </div>
                                )
                            })}
                        </div>
                    }
                    <ShowDate
                        date={message.date}
                        className='messagetime'
                    />
                </div>

                <ContextMenu
                    message={message}
                    userId={userId}
                    deleteMessage={deleteMessage}
                    isReceived={isReceived}
                    rightClick={rightClick}
                    setRightClick={setRightClick}
                />
            </div>
        </>
    )
}

export default Message
