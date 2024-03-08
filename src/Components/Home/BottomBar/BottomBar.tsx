import React, { useState } from 'react'
import JoinFile from '../../../assets/JoinFile.svg'
import VoiceMessage from '../../../assets/VoiceMessage.svg'
import Trash from '../../../assets/Trash.svg'
import Dropzone from 'react-dropzone'
import { FileIcon, defaultStyles } from 'react-file-icon'
import { onDrop, deleteFile, handleEnterPressed } from '../../../Functions/BottomBar/BottomBar'

import './BottomBar.css'

const BottomBar = ({ conversationActive, message, handleMessageChange, sendMessage, typingStatus, name, filesEmpty, setFilesEmpty, files, setFiles }: BottomBarProps) => {

    return (
        <div className='bottombar'>
            {/* Composant est en train d'écrire */}
            {
                typingStatus[conversationActive as keyof typeof typingStatus] ? (
                    <div className="typingstatus">
                        <p>{name.charAt(0).toUpperCase() + name.slice(1)} est en train d'écrire</p>
                    </div>
                ) : (
                    null
                )

            }

            {/* Composant pour liser les fichiers */}
            {files.length > 0 ? (
                <div className="fileslist">
                    {
                        files.map((file, index) => {
                            return (
                                // Composant pour fichier dans le chat
                                <div key={index} className="file">
                                    <p className='filename'>{file.name.length > 10 ? file.name.slice(0, 10) + '...' : file.name}</p>
                                    <div className="fileicon">
                                        <FileIcon extension={file.extension} {...defaultStyles[file.extension as keyof typeof defaultStyles]} />
                                    </div>
                                    <img src={Trash} alt="trash" className='trashfile' onClick={() => deleteFile(index, setFiles, files, setFilesEmpty)} />
                                </div>
                            )
                        })
                    }
                </div>
            ) : null}

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
