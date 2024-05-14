import React, { useEffect, useRef, useState } from 'react'
import MessagePrivacy from '../MessagePrivacy/MessagePrivacy'
import styles from './style.module.css'
import MessageDate from '../MessageDate/MessageDate'
import Message from '../Message/Message'
import MessageFile from '../MessageFile/MessageFile'
import { isBottomRounded, isTopRounded } from '@/Functions/MessagesList/MessagesList'
import IsTyping from '../Message/IsTyping'

interface MessagesAreaProps {
    showSearchConv: boolean,
    messagesCount: number,
    messages: message[],
    filesEmpty: boolean,
    deleteMessage: Function,
    conversationActive: string,
    typingStatus: { [key: string]: boolean }
}

const MessagesArea = ({
    showSearchConv,
    messages,
    messagesCount,
    filesEmpty,
    deleteMessage,
    conversationActive,
    typingStatus
}: MessagesAreaProps) => {

    const [messageDay, setMessageDay] = useState<Number>(0)

    const scrollBottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollBottomRef.current) {
            scrollBottomRef.current.scrollIntoView()
        }
    }, [messages])

    return (
        <div className={styles.messagesection + " " + (showSearchConv ? styles.messagesectionmedium : styles.messagesectionfull) + " " + (filesEmpty ? styles.messagesectionheightMax : styles.messagesectionheightMin)}>
            <MessagePrivacy />

            {
                messageDay === 0 && messages.length > 0 ?
                    <MessageDate message={messages[0]} />
                    : null
            }

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
                                    i={i}
                                    scrollBottomRef={scrollBottomRef}
                                    key={message._id}
                                    topRounded={isTopRounded(previousMessage, message.sender_id, message.date)}
                                    bottomRounded={isBottomRounded(nextMessage, message.sender_id, message.date)}
                                    messagesCount={messagesCount}
                                    deleteMessage={deleteMessage}
                                    conversationActive={conversationActive}
                                /> :
                                <MessageFile
                                    message={message}
                                    i={i}
                                    scrollBottomRef={scrollBottomRef}
                                    key={message._id}
                                    topRounded={isTopRounded(previousMessage, message.sender_id, message.date)}
                                    bottomRounded={isBottomRounded(nextMessage, message.sender_id, message.date)}
                                    messagesCount={messagesCount}
                                    deleteMessage={deleteMessage}
                                />
                        }
                    </>
                )
            })}
            
            <IsTyping
                isTyping={typingStatus[conversationActive]}
            />
        </div>
    )
}

export default MessagesArea
