import React from 'react'
import "./Conversation.css"
import Conv1 from '../../../assets/conv1.svg'
import Online from '../../../assets/Online.svg'
import Offline from '../../../assets/Offline.svg'
import DoubleChevrons from '../../../assets/DoubleChevrons.svg'
import Pinned from '../../../assets/Pinned.svg'
import Pin from '../../../assets/Pin.svg'
import ShowDate from '../../Home/ShowDate/ShowDate'
import ConversationStatus from '../ConversationStatus/ConversationStatus'
import ConversationInfos from '../ConversationInfos/ConversationInfos'


const Conversation = ({ conversation, handleConversationActive, handleHoverConv, handleHoverConvReset, typingStatus, handlePinnedConversation, userId, classActive, topRound, bottomRound, noConvActiveClass }: ConversationProps) => {
    return (
        <div className={`conversation ${classActive} ${topRound} ${bottomRound} ${noConvActiveClass}`} key={conversation._id} onMouseEnter={() => handleHoverConv(conversation._id)} onMouseLeave={handleHoverConvReset}>

            <ConversationStatus _id={conversation._id} pic={conversation.pic} status={conversation.status} handleConversationActive={handleConversationActive} />

            <ConversationInfos
                _id={conversation._id}
                name={conversation.name}
                last_message_sender={conversation.last_message_sender}
                last_message_content={conversation.last_message_content}
                typingStatus={typingStatus}
                userId={userId}
                handleConversationActive={handleConversationActive}
            />

            <ShowDate date={conversation.last_message_date} />
            <img src={conversation.pinnedBy.includes(userId) ? Pinned : Pin} alt="pinned" className='pinned' onClick={() => handlePinnedConversation(conversation._id)} />
        </div>
    )
}

export default Conversation