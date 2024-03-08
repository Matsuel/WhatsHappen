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
import Bottombar from '../../Bottombar/Bottombar'

const BottomBar = ({ conversationActive, message, handleMessageChange, sendMessage, typingStatus, name, filesEmpty, setFilesEmpty, files, setFiles }: BottomBarProps) => {

    return (
        <div className='bottombar'>
            <IsTyping conversationActive={conversationActive} typingStatus={typingStatus} name={name} />

            <FilesList files={files} setFiles={setFiles} setFilesEmpty={setFilesEmpty} />

            <Bottombar conversationActive={conversationActive} message={message} handleMessageChange={handleMessageChange} sendMessage={sendMessage} files={files} setFiles={setFiles} setFilesEmpty={setFilesEmpty} />
        </div>
    )
}

export default BottomBar
