import React from 'react'
import styles from './style.module.scss'

interface IsTypingProps {
    isTyping: boolean
}

const IsTyping = ({
    isTyping
}: IsTypingProps) => {
    return (
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
    )
}

export default IsTyping