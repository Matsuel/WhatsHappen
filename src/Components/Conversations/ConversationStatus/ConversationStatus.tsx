import React from 'react'
import "./ConversationStatus.css"
import Conv1 from '../../../assets/conv1.svg'
import Online from '../../../assets/Online.svg'
import Offline from '../../../assets/Offline.svg'

const ConversationStatus = ({ _id, pic, status, handleConversationActive }: ConversationStatusProps) => {
    return (
        <div className="convimagestatus" onClick={() => handleConversationActive(_id)}>
            <img src={pic ? `data:image/jpeg;base64,${pic}` : Conv1} alt="conv1" className='conversationimage' />
            <img src={status ? Online : Offline} alt="online" className='speakerstatus' />
        </div>
    )
}

export default ConversationStatus