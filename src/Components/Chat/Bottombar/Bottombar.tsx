import React from 'react'
import styles from './Bottombar.module.css'
import JoinFile from '@/assets/JoinFile.svg'
import VoiceMessage from '@/assets/VoiceMessage.svg'
import Dropzone from 'react-dropzone'
import { onDrop, handleEnterPressed } from '../../../Functions/BottomBar/BottomBar'
import Image from 'next/image'

const Bottombar = ({ conversationActive, message, handleMessageChange, sendMessage, files, setFiles, setFilesEmpty }: BottombarProps) => {
    return (
        <div className={styles.conversationbottombar}>
            <Dropzone onDrop={(acceptedFiles) => onDrop(acceptedFiles, setFiles, setFilesEmpty)}>
                {({ getRootProps, getInputProps }) => (
                    <div className={styles.joinfile} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Image src={JoinFile} alt="joinfile" />
                    </div>
                )}
            </Dropzone>
            <input type="text" name="message-input" id="message-input" className={styles.messageinput} value={message} onChange={(e) => handleMessageChange(e)} onKeyDown={(e) => handleEnterPressed(e, sendMessage, conversationActive, files)} />
            <Image src={VoiceMessage} alt="voicemessage" className={styles.voicemessage} />
        </div>
    )
}

export default Bottombar