import React, { useState } from 'react'
import JoinFile from '../../../assets/JoinFile.svg'
import VoiceMessage from '../../../assets/VoiceMessage.svg'
import Trash from '../../../assets/Trash.svg'
import Dropzone from 'react-dropzone'
import { FileIcon, defaultStyles } from 'react-file-icon'

import './BottomBar.css'

const BottomBar = ({ conversationActive, message, handleMessageChange, sendMessage, typingStatus, name, filesEmpty, setFilesEmpty, files, setFiles }: BottomBarProps) => {
    

    const onDrop = (acceptedFiles: File[]) => {
        console.log(acceptedFiles)

        setFilesEmpty(false)
        acceptedFiles.forEach((file: File, index: number) => {
            const reader = new FileReader()
            // reader.readAsArrayBuffer(file)
            reader.readAsDataURL(file)
            reader.onload = () => {
                setFiles((prevFiles: FileInfos[]) => {
                    const newFiles = [...prevFiles]
                    newFiles[index] = {
                        name: file.name,
                        content: reader.result as string,
                        type: file.type,
                        lastModified: file.lastModified,
                        extension: file.name.split('.').pop() as string
                    } 
                    console.log(reader.result as ArrayBuffer)
                    return newFiles
                })
            }
        })
    }

    // Mettre fonctions dans un dossier fonctions
    const deleteFile = (index: number) => {
        setFiles((prevFiles: FileInfos[]) => prevFiles.filter((_, i) => i !== index))
        files.length === 1 && setFilesEmpty(true)
    }

    const handleEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage(conversationActive, files)
        }
    }

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
                                    <img src={Trash} alt="trash" className='trashfile' onClick={() => deleteFile(index)} />
                                </div>
                            )
                        })
                    }
                </div>
            ) : null}

            {/* Ca c'est le composant BottomBar */}
            <div className="conversationbottombar">
                <Dropzone onDrop={(acceptedFiles) => onDrop(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                        <div className="joinfile" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img src={JoinFile} alt="joinfile" />
                        </div>
                    )}
                </Dropzone>
                <input type="text" name="message-input" id="message-input" className='message-input' value={message} onChange={(e) => handleMessageChange(e)} onKeyDown={(e) => handleEnterPressed(e)} />
                <img src={VoiceMessage} alt="voicemessage" className='voicemessage' />
            </div>
        </div>
    )
}

export default BottomBar
