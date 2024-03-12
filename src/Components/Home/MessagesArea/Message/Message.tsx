import React, { useState } from 'react'
import Picker, { Emoji } from 'emoji-picker-react'
import { handleContextMenu, handleMouseDown, handleMouseUp } from '../../../../Functions/Message/Message'

import './Message.css'
import { ContextMenuMessage, ContextMenuMessageButton } from '../ContextMenuMessage/ContextMenuMessage'
import ShowDate from '../../ShowDate/ShowDate'

const Message = ({ message, userId, i, scrollBottomRef, bottomRounded, topRounded, messagesCount, deleteMessage, showSearchConv, handleReaction }: MessageProps) => {

    const [rightClick, setRightClick] = useState<boolean>(false)
    const [longPress, setLongPress] = useState<number | null>(null)

    const isReceived = message.sender_id !== userId
    const messageClass = isReceived ? 'messagereceived' : 'messagesent'
    const firstPlan = rightClick ? 'messagefirstplan' : ''
    const topClass = isReceived ? (topRounded ? 'messagereceivedtop' : 'messagereceivedmiddle') : (topRounded ? 'messagesenttop' : 'messagesentmiddle');
    const bottomClass = isReceived ? (bottomRounded ? 'messagereceivedbottom' : '') : (bottomRounded ? 'messagesentbottom' : '');

    return (
        <>
            {/* Voir si je peux pas gérer la condition directement dans le composant */}
            {rightClick && <ContextMenuMessage setRightClick={setRightClick} showSearchConv={showSearchConv} />}
            <div className={`message ${firstPlan}`} ref={i === messagesCount - 1 ? scrollBottomRef : null} onContextMenu={(e) => handleContextMenu(e, setRightClick)} onClick={(e) => e.detail === 2 && handleReaction(message._id, "2764-fe0f")} onMouseDown={() => handleMouseDown(setRightClick, setLongPress)}
            onMouseUp={() => handleMouseUp(longPress, setLongPress)}
            onMouseLeave={() => handleMouseUp(longPress, setLongPress)}>
                {rightClick &&
                    [
                        <Picker reactionsDefaultOpen={true} className={`reactiondiv ${isReceived ? "messagecontextmenureceived" : "messagecontextmenusent"}`} onEmojiClick={(emoji: EmojiPickerProps) => { handleReaction(message._id, emoji.unified); setRightClick(false); }} />,
                    ]
                }
                {/* Composant message  */}
                <div className={`${messageClass} ${topClass} ${bottomClass}`} key={message._id}>
                    <p className='messagecontent'>
                        {message.content}
                    </p>
                    {
                        message.reactions && message.reactions.length > 0 &&

                        // Composant REactions list 
                        <div className="reactions">
    
                            {message.reactions.map((reaction, i) => {
                                const myReaction = reaction.user_id === userId

                                return (
                                    // composant reaction
                                    <div className={`reaction ${myReaction ? "myReaction": ""}`} key={i} onClick={() => { handleReaction(message._id, reaction.reaction) }}>
                                        <Emoji unified={reaction.reaction} size={13} />
                                    </div>
                                )
                            })}
                        </div>
                    }
                    <ShowDate date={message.date} className='messagetime' />
                </div>
                {/* Voir si je peux pas gérer la condition directement dans le composant */}
                {rightClick && <ContextMenuMessageButton message={message} userId={userId} deleteMessage={deleteMessage} isReceived={isReceived} />}
            </div>
        </>
    )
}

export default Message
