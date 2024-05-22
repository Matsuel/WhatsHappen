import React from 'react'
import styles from './style.module.scss'
import DisplayAvatar from '../DisplayAvatar/DisplayAvatar'
import Reactions from './Reactions'

interface ContentProps {
    message: message,
    isNextMessageSameSender: boolean,
    pic: string,
    handleReaction: Function,
    isReceived: boolean,
    messageClass: string,
    topClass: string,
    bottomClass: string

}

const Content = ({
    message,
    isNextMessageSameSender,
    pic,
    handleReaction,
    isReceived,
    messageClass,
    topClass,
    bottomClass
}: ContentProps) => {
    return (
        <div className={messageClass + " " + topClass + " " + bottomClass} key={message._id}>
            {isNextMessageSameSender &&
                <div className={styles.avatarLastMessage}>
                    <DisplayAvatar pic={pic} size={50} />
                </div>
            }
            <p className={
                isReceived ? styles.messagecontent : styles.messagecontentMe
            }>
                {message.content}
            </p>

            <Reactions
                reactions={message.reactions}
                handleReaction={handleReaction}
                id={message._id}
            />

        </div>
    )
}

export default Content