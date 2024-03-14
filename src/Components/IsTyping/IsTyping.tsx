import React from 'react'
import styles from './IsTyping.module.css'

const IsTyping = ({ conversationActive, typingStatus, name }: IsTypingProps) => {
  return (
    <>
    {
        typingStatus[conversationActive as keyof typeof typingStatus] ? (
            <div className={styles.typingstatus}>
                <p>{name.charAt(0).toUpperCase() + name.slice(1)} est en train d'écrire</p>
            </div>
        ) : (
            null
        )

        // <div className="typingstatusmessage">
        //     <div className="typingstatus">
        //         <div className="dot-typing"></div>
        //         <div className="dot-typing"></div>
        //         <div className="dot-typing"></div>

        //     </div>
        //     </div>

    }
    </>
  )
}

export default IsTyping