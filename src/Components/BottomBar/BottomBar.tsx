import React from 'react'
// @ts-ignore
import JoinFile from '../../assets/JoinFile.svg'
// @ts-ignore
import Send from '../../assets/Send.svg'
// @ts-ignore
import VoiceMessage from '../../assets/VoiceMessage.svg'

const BottomBar = ({ conversationActive , message, setMessage, sendMessage }: BottomBarProps) => {
    return (
        <div className="conversationbottombar">
            <img src={JoinFile} alt="joinfile" className='joinfile' />
            <input type="text" name="message-input" id="message-input" className='message-input' value={message} onChange={(e) => setMessage(e.target.value)} />
            <img src={Send} alt="send" className='send' onClick={() => sendMessage(conversationActive)} />
            <img src={VoiceMessage} alt="voicemessage" className='voicemessage' />
        </div>
    )
}

export default BottomBar
