import React, { useState } from 'react'
import JoinFile from '../../../assets/JoinFile.svg'
import VoiceMessage from '../../../assets/VoiceMessage.svg'
import Dropzone from 'react-dropzone'

import './BottomBar.css'

const BottomBar = ({ conversationActive , message, handleMessageChange, sendMessage, typingStatus, name }: BottomBarProps) => {

    const [filesInfos, setFilesInfos] = useState<File[]>([])
    const [filesContent, setFilesContent] = useState<ArrayBuffer[]>([])

    const onDrop = (acceptedFiles: File[]) => {
        setFilesInfos(prevFilesInfos => [...prevFilesInfos, ...acceptedFiles])
        acceptedFiles.forEach((file: File) => {
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = () => {
                setFilesContent(prevFilesContent => [...prevFilesContent, reader.result as ArrayBuffer])
            }
        })
    }

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

        <div className="fileslist">
            {
                filesInfos.map((file, index) => {
                    return (
                        <div key={index} className="file">
                            <p>{file.name}</p>
                        </div>
                    )
                })
            }
        </div>
        
        <div className="conversationbottombar">
            <Dropzone onDrop={(acceptedFiles) => onDrop(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <div className="joinfile" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <img src={JoinFile} alt="joinfile" />
                    </div>
                )}
            </Dropzone>
            <p>{filesContent.length}</p>
            <p>{filesInfos.length}</p>
            {/* <img src={JoinFile} alt="joinfile" className='joinfile' /> */}
            <input type="text" name="message-input" id="message-input" className='message-input' value={message} onChange={(e) => handleMessageChange(e)} onKeyDown={(e)=> handleEnterPressed(e)} />
            <img src={VoiceMessage} alt="voicemessage" className='voicemessage' />
        </div>
        </div>
    )
}

export default BottomBar
