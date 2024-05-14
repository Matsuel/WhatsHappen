import React from 'react'
import styles from './IsTyping.module.css'

interface IsTypingProps {
  conversationActive: string,
  typingStatus: Object,
  name: string,
}

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
      }
    </>
  )
}

export default IsTyping