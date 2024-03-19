import React, { useState } from 'react'
import styles from './Bottombar.module.css'
import JoinFile from '@/assets/JoinFile.svg'
import VoiceMessage from '@/assets/VoiceMessage.svg'
import Dropzone from 'react-dropzone'
import { onDrop, handleEnterPressed } from '../../../Functions/BottomBar/BottomBar'
import Image from 'next/image'
import EmojiPicker, { Emoji } from 'emoji-picker-react'

const emojiList = ["1f929", "1f607", "1f913", "1f635-200d-1f4ab", "1fae0", "1f602", "1f929", "1f600", "1f621", "1f603", '1f600', '1f603', '1f604', '1f601', '1f606', '1f605', '1f602', '1f923', '1f642', '1f643', '1f609', '1f60a', '1f607', '1f970', '1f60d', '1f929', '1f618', '1f617', '1f61a'];

const RandomEmojis: EmojiPickerProps[] = emojiList.map((emoji) => ({ unified: emoji }));

interface BottombarProps {
    conversationActive: string,
    message: string,
    handleMessageChange: Function,
    sendMessage: Function,
    files: FileInfos[],
    setFiles: Function,
    setFilesEmpty: Function,
}

const Bottombar = ({ conversationActive, message, handleMessageChange, sendMessage, files, setFiles, setFilesEmpty }: BottombarProps) => {
    const [emojiIndex, setEmojiIndex] = useState<number>(Math.floor(Math.random() * RandomEmojis.length))
    const [openPicker, setOpenPicker] = useState<boolean>(false)

    const handleRandomEmoji = () => {
        setEmojiIndex(Math.floor(Math.random() * RandomEmojis.length))
    }

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
            <div className={styles.emojiPicker} onMouseEnter={handleRandomEmoji} onClick={() => setOpenPicker(!openPicker)}>
                <Emoji unified={RandomEmojis[emojiIndex].unified} size={24} />
            </div>

            {openPicker &&
                <div className={styles.emojiPickerContainer}>
                    <EmojiPicker />
                </div>
            }
        </div>
    )
}

export default Bottombar