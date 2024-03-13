import React from 'react'
import './Bottombar.css'
import JoinFile from '../../../assets/JoinFile.svg'
import VoiceMessage from '../../../assets/VoiceMessage.svg'
import Dropzone from 'react-dropzone'
import { onDrop, handleEnterPressed } from '../../../Functions/BottomBar/BottomBar'

const Bottombar = ({ conversationActive, message, handleMessageChange, sendMessage, files, setFiles, setFilesEmpty }: BottombarProps) => {
    return (
        <div className="conversationbottombar">
            <Dropzone onDrop={(acceptedFiles) => onDrop(acceptedFiles, setFiles, setFilesEmpty)}>
                {({ getRootProps, getInputProps }) => (
                    <div className="joinfile" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <img src={JoinFile} alt="joinfile" />
                    </div>
                )}
            </Dropzone>
            <input type="text" name="message-input" id="message-input" className='message-input' value={message} onChange={(e) => handleMessageChange(e)} onKeyDown={(e) => handleEnterPressed(e, sendMessage, conversationActive, files)} />
            <img src={VoiceMessage} alt="voicemessage" className='voicemessage' />
        </div>
    )
}

export default Bottombar