import React, { useState } from 'react'
import styles from './style.module.css'
import JoinFile from '@/assets/JoinFile.svg'
import VoiceMessage from '@/assets/VoiceMessage.svg'
import Dropzone from 'react-dropzone'
import { onDrop, handleEnterPressed } from '../../Functions/BottomBar/BottomBar'
import Image from 'next/image'
import EmojiPicker, { Emoji } from 'emoji-picker-react'
import { useClickAway } from '@uidotdev/usehooks';

const emojiList = ["1f929", "1f607", "1f913", "1f635-200d-1f4ab", "1fae0", "1f602", "1f929", "1f600", "1f621", "1f603", '1f600', '1f603', '1f604', '1f601', '1f606', '1f605', '1f602', '1f923', '1f642', '1f643', '1f609', '1f60a', '1f607', '1f970', '1f60d', '1f929', '1f618', '1f617', '1f61a'];

const RandomEmojis: EmojiPickerProps[] = emojiList.map((emoji) => ({ unified: emoji }));

interface InputBarProps {
    conversationActive: string,
    message: string,
    handleMessageChange: Function,
    sendMessage: Function,
}

const InputBar = ({
    conversationActive,
    message,
    handleMessageChange,
    sendMessage,
}: InputBarProps) => {

    const ref = useClickAway(() => {
        setOpenPicker(false);
        setEmojiClickAway(true);
    }) as React.MutableRefObject<HTMLDivElement>;

    
    const [emojiClickAway, setEmojiClickAway] = useState<boolean>(false);

    const [emojiIndex, setEmojiIndex] = useState<number>(Math.floor(Math.random() * RandomEmojis.length))
    const [openPicker, setOpenPicker] = useState<boolean>(false)

    const showEmoji = () => {
        if (!openPicker && emojiClickAway) {
            setOpenPicker(false);
            setEmojiClickAway(false);
        }
        else {
            setOpenPicker(true);
        }
    }


    const handleRandomEmoji = () => {
        setEmojiIndex(Math.floor(Math.random() * RandomEmojis.length))
    }

    return (
        <div className={styles.conversationbottombar}>
            <Dropzone 
            // onDrop={(acceptedFiles) => onDrop(acceptedFiles, setFiles, setFilesEmpty)}
            >
                {({ getRootProps, getInputProps }) => (
                    <div className={styles.joinfile} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Image src={JoinFile} alt="joinfile" />
                    </div>
                )}
            </Dropzone>
            <input type="text" name="message-input" id="message-input" className={styles.messageinput} value={message} onChange={(e) => handleMessageChange(e.target.value, false)} onKeyDown={(e) => handleEnterPressed(e, sendMessage, conversationActive)} />
            <Image src={VoiceMessage} alt="voicemessage" className={styles.joinfile} />
            <div className={styles.emojiPicker} 
            onMouseEnter={handleRandomEmoji} 
            onClick={() => showEmoji()}>
                <Emoji unified={RandomEmojis[emojiIndex].unified} size={24} />
            </div>

            {openPicker &&
                <div className={styles.emojiPickerContainer} ref={ref}>
                    <EmojiPicker
                        onEmojiClick={(e) => handleMessageChange(e.emoji, true)}
                    />
                </div>
            }
        </div>
    )
}

export default InputBar