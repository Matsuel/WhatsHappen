import React from 'react'
import styles from './Conversation.module.scss'
import Online from '@/assets/Online.svg'
import Offline from '@/assets/Offline.svg'
import Image from 'next/image'
import DisplayAvatar from '../DisplayAvatar/DisplayAvatar'


interface ConversationStatusProps {
    _id: string,
    pic: string,
    status: boolean,
    handleConversationActive: Function
}

const ConversationStatus = ({
    _id,
    pic,
    status,
    handleConversationActive
}: ConversationStatusProps) => {
    
    return (
        <div className={styles.convimagestatus} onClick={() => handleConversationActive(_id)}>

            <DisplayAvatar pic={pic} size={60} />

            <Image
                src={status ? Online : Offline}
                alt="online"
                className={styles.speakerstatus}
                width={0}
                height={0}
            />

        </div>
    )
}

export default ConversationStatus