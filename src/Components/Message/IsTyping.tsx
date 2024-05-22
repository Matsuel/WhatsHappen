import React, { useState } from 'react'
import styles from './style.module.scss'
import { socket } from '@/pages/_app'

interface IsTypingProps {
    conversationActive: string
}

const IsTyping = ({
    conversationActive
}: IsTypingProps) => {

    const [isTyping, setIsTyping] = useState<boolean>(false)

    socket.on('typing', (data: any) => {
        if (data.conversationId === conversationActive) {
            setIsTyping(data.typing)
        }
    })

    return (
        <>
            {isTyping &&
                <div className={styles.message}>

                    <div className={[
                        styles.messagereceived,
                        styles.messagereceivedtop,
                        styles.messagereceivedbottom
                    ].join(' ')}>

                        <div className={styles.messagecontent}>

                            <div className={styles.isTyping}>
                                <div className={styles.dot}></div>
                                <div className={styles.dot}></div>
                                <div className={styles.dot}></div>
                            </div>

                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default IsTyping