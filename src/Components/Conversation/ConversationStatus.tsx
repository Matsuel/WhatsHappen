import React from 'react'
import styles from './Conversation.module.css'
import Online from '@/assets/Online.svg'
import Offline from '@/assets/Offline.svg'
import Image from 'next/image'
import Avatar from '../Avatar/Avatar'


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

            {pic ? <Image src={`data:image/jpeg;base64,${pic}`} alt="conv1" className={styles.conversationimage} width={0} height={0} /> : <Avatar width={60} height={60} />}

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