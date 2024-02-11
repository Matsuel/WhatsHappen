import React from 'react'
// @ts-ignore
import JoinFile from '../../../assets/JoinFile.svg'
// @ts-ignore
import Send from '../../../assets/Send.svg'
// @ts-ignore
import VoiceMessage from '../../../assets/VoiceMessage.svg'

const BottomBar = ({ conversationActive , message, handleMessageChange, sendMessage, typingStatus, conversation }: BottomBarProps) => {
    return (
        <div className='bottombar'>
        {
            typingStatus[conversationActive as keyof typeof typingStatus] ? (
                <div className="typingstatus">
                    <p>{conversation.conversationInfos.name.charAt(0).toUpperCase() + conversation.conversationInfos.name.slice(1)} est en train d'écrire</p>
                </div>
            ) : (
                null
            )
            
        }
        
        <div className="conversationbottombar">
            <img src={JoinFile} alt="joinfile" className='joinfile' />
            <input type="text" name="message-input" id="message-input" className='message-input' value={message} onChange={(e) => handleMessageChange(e)} />
            <img src={Send} alt="send" className='send' onClick={() => sendMessage(conversationActive)} />
            <img src={VoiceMessage} alt="voicemessage" className='voicemessage' />
        </div>
        </div>
    )
}

export default BottomBar
