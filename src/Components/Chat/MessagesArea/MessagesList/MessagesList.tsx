import React from 'react'
import Message from './Message/Message'
import MessageFile from './MessageFile/MessageFile'
import MessageDate from './MessageDate/MessageDate'
import { isBottomRounded, isTopRounded } from '../../../../Functions/MessagesList/MessagesList'


const MessagesList = ({ userId, scrollBottomRef, showSearchConv, messages, messagesCount, deleteMessage, handleReaction }: MessagesListProps) => {
    return (
        <>
            {messages.map((message, i) => {
                const nextMessage = i < messagesCount - 1 ? messages[i + 1] : null
                const previousMessage = i > 0 ? messages[i - 1] : null

                return (
                    <>
                        {
                            previousMessage && new Date(message.date).toDateString() !== new Date(previousMessage?.date).toDateString() ?
                                (
                                    <MessageDate message={message} />
                                ) : null

                        }

                        {
                            message.type === "text" ?
                                <Message
                                    message={message}
                                    userId={userId}
                                    i={i}
                                    scrollBottomRef={scrollBottomRef}
                                    key={message._id}
                                    topRounded={isTopRounded(previousMessage, message.sender_id, message.date)}
                                    bottomRounded={isBottomRounded(nextMessage, message.sender_id, message.date)}
                                    messagesCount={messagesCount}
                                    deleteMessage={deleteMessage}
                                    showSearchConv={showSearchConv}
                                    handleReaction={handleReaction}
                                /> :
                                <MessageFile
                                    message={message}
                                    userId={userId}
                                    i={i}
                                    scrollBottomRef={scrollBottomRef}
                                    key={message._id}
                                    topRounded={isTopRounded(previousMessage, message.sender_id, message.date)}
                                    bottomRounded={isBottomRounded(nextMessage, message.sender_id, message.date)}
                                    messagesCount={messagesCount}
                                    deleteMessage={deleteMessage}
                                    showSearchConv={showSearchConv}
                                />
                        }
                    </>
                )
            })}
        </>
    )
}

export default MessagesList