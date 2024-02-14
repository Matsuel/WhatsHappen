import React from 'react'
import JoinFile from '../../../assets/JoinFile.svg'
import VoiceMessage from '../../../assets/VoiceMessage.svg'

import './BottomBar.css'

const BottomBar = ({ conversationActive , message, handleMessageChange, sendMessage, typingStatus, name }: BottomBarProps) => {

    const handleEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage(conversationActive)
        }
    }

    return (
        <div className='bottombar'>
        {
            typingStatus[conversationActive as keyof typeof typingStatus] ? (
                <div className="typingstatus">
                    <p>{name.charAt(0).toUpperCase() + name.slice(1)} est en train d'écrire</p>
                </div>
            ) : (
                null
            )
            
        }
        
        <div className="conversationbottombar">
            <img src={JoinFile} alt="joinfile" className='joinfile' />
            <input type="text" name="message-input" id="message-input" className='message-input' value={message} onChange={(e) => handleMessageChange(e)} onKeyDown={(e)=> handleEnterPressed(e)} />
            <img src={VoiceMessage} alt="voicemessage" className='voicemessage' />
        </div>
        </div>
    )
}

export default BottomBar
