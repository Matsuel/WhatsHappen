import React, { useState } from 'react'
import JoinFile from '../../../assets/JoinFile.svg'
import VoiceMessage from '../../../assets/VoiceMessage.svg'
import Trash from '../../../assets/Trash.svg'
import Dropzone from 'react-dropzone'
import { FileIcon, defaultStyles } from 'react-file-icon'
import { onDrop, deleteFile, handleEnterPressed } from '../../../Functions/BottomBar/BottomBar'

import './BottomBar.css'
import IsTyping from '../../IsTyping/IsTyping'
import FilesList from '../../FilesList/FilesList'

const BottomBar = ({ conversationActive, message, handleMessageChange, sendMessage, typingStatus, name, filesEmpty, setFilesEmpty, files, setFiles }: BottomBarProps) => {

    return (
        <div className='bottombar'>
            <IsTyping conversationActive={conversationActive} typingStatus={typingStatus} name={name} />

            <FilesList files={files} setFiles={setFiles} setFilesEmpty={setFilesEmpty} />

            {/* Ca c'est le composant BottomBar */}
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
        </div>
    )
}

export default BottomBar
