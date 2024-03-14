import React, { useState } from 'react'
import Picker, { Emoji } from 'emoji-picker-react'
import { handleContextMenu, handleMouseDown, handleMouseUp } from '../../../../../Functions/Message/Message'

import styles from './Message.module.css'
import { ContextMenuMessageButton } from '../ContextMenuMessage/ContextMenuMessage'
import ShowDate from '../../../../Home/ShowDate/ShowDate'

const Message = ({ message, userId, i, scrollBottomRef, bottomRounded, topRounded, messagesCount, deleteMessage, showSearchConv, handleReaction }: MessageProps) => {

    const [rightClick, setRightClick] = useState<boolean>(false)
    const [longPress, setLongPress] = useState<number | null>(null)

    const isReceived = message.sender_id !== userId
    const messageClass = isReceived ? styles.messagereceived : styles.messagesent
    const firstPlan = rightClick ? styles.messagefirstplan : ''
    const topClass = isReceived ? (topRounded ? styles.messagereceivedtop : styles.messagereceivedmiddle) : (topRounded ? styles.messagesenttop : styles.messagesentmiddle)
    const bottomClass = isReceived ? (bottomRounded ? styles.messagereceivedbottom : '') : (bottomRounded ? styles.messagesentbottom : '');

    return (
        <>
            <div className={styles.message + " " + firstPlan} ref={i === messagesCount - 1 ? scrollBottomRef : null} onContextMenu={(e) => handleContextMenu(e, setRightClick)} onClick={(e) => e.detail === 2 && handleReaction(message._id, "2764-fe0f")} onMouseDown={() => handleMouseDown(setRightClick, setLongPress)}
                onMouseUp={() => handleMouseUp(longPress, setLongPress)}
                onMouseLeave={() => handleMouseUp(longPress, setLongPress)}>
                {rightClick && <Picker reactionsDefaultOpen={true} className={styles.reactiondiv + " " + (isReceived ? styles.messagecontextmenureceived : styles.messagecontextmenusent)} onEmojiClick={(emoji: EmojiPickerProps) => { handleReaction(message._id, emoji.unified); setRightClick(false); }} />}
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
                    <ShowDate date={message.date} className='messagetime' />
                </div>
                {rightClick && <ContextMenuMessageButton message={message} userId={userId} deleteMessage={deleteMessage} isReceived={isReceived} />}
            </div>
        </>
    )
}

export default Message
