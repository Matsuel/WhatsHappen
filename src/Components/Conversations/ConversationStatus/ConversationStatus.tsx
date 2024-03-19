import React from 'react'
import styles from './ConversationStatus.module.css'
import Conv1 from '../../../assets/conv1.svg'
import Online from '../../../assets/Online.svg'
import Offline from '../../../assets/Offline.svg'
import Image from 'next/image'


interface ConversationStatusProps {
    _id: string,
    pic: string,
    status: boolean,
    handleConversationActive: Function
}

const ConversationStatus = ({ _id, pic, status, handleConversationActive }: ConversationStatusProps) => {
    return (
        <div className={styles.convimagestatus} onClick={() => handleConversationActive(_id)}>
            <Image src={pic ? `data:image/jpeg;base64,${pic}` : Conv1} alt="conv1" className={styles.conversationimage} width={0} height={0} />
            <Image src={status ? Online : Offline} alt="online" className={styles.speakerstatus} width={0} height={0} />
        </div>
    )
}

export default ConversationStatus