import React from 'react'
import Emoji from '../../assets/Emoji.tsx'
import JoinFile from '../../assets/JoinFile.svg'
import VoiceMessage from '../../assets/VoiceMessage.svg'
import './Home.css'

const MessageBar = () => {
    return (
        <div className='message-bar-wrapper'>
            <div className="message-bar">
                <button className='button-bar'>
                    <Emoji />
                </button>
                <button className='button-bar'>
                    <img src={JoinFile} alt="" />
                </button>
                <input type="text" className='message-input' />
                <button className='button-bar'>
                    <img src={VoiceMessage} alt="" />
                </button>
            </div>
        </div>
    )
}

export default MessageBar