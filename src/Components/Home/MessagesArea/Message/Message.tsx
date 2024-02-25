import React, { useState } from 'react'
import Picker, { Emoji } from 'emoji-picker-react'

import './Message.css'
import { ContextMenuMessage, ContextMenuMessageButton } from '../ContextMenuMessage/ContextMenuMessage'

const Message = ({ message, userId, i, scrollBottomRef, bottomRounded, topRounded, messagesCount, deleteMessage, showSearchConv, handleReaction }: MessageProps) => {

    const [rightClick, setRightClick] = useState<boolean>(false)

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setRightClick(true)
    }



    const isReceived = message.sender_id !== userId

    // console.log(message.reactions)

    const messageClass = isReceived ? 'messagereceived' : 'messagesent'
    const firstPlan = rightClick ? 'messagefirstplan' : ''
    const topClass = isReceived ? (topRounded ? 'messagereceivedtop' : 'messagereceivedmiddle') : (topRounded ? 'messagesenttop' : 'messagesentmiddle');
    const bottomClass = isReceived ? (bottomRounded ? 'messagereceivedbottom' : '') : (bottomRounded ? 'messagesentbottom' : '');

    return (
        <>
            {rightClick && <ContextMenuMessage setRightClick={setRightClick} showSearchConv={showSearchConv} />}
            <div className={`message ${firstPlan}`} ref={i === messagesCount - 1 ? scrollBottomRef : null} onContextMenu={(e) => handleContextMenu(e)}>
                {rightClick &&
                    [
                        <Picker reactionsDefaultOpen={true} className={`reactiondiv ${isReceived ? "messagecontextmenureceived" : "messagecontextmenusent"}`} onEmojiClick={(emoji: EmojiPickerProps) => { handleReaction(message._id, emoji.unified); setRightClick(false); }} />,
                    ]
                }
                <div className={`${messageClass} ${topClass} ${bottomClass}`} key={message._id}>
                    <p className='messagecontent'>
                        {message.content}
                    </p>
                    {
                        message.reactions && message.reactions.length > 0 &&
                        <div className="reactions">
                            {message.reactions.map((reaction, i) => {
                                return (
                                    <Emoji key={i} unified={reaction.reaction} size={14 } />
                                )
                            })}
                        </div>
                    }
                    <p className='messagetime'>
                        {new Date(message.date).getHours()}:
                        {new Date(message.date).getMinutes().toString().padStart(2, '0')}
                    </p>
                </div>
                {rightClick && <ContextMenuMessageButton message={message} userId={userId} deleteMessage={deleteMessage} isReceived={isReceived} />}
            </div>
        </>
    )
}

export default Message
