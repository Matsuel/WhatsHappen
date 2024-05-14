import React from 'react'
import styles from './Conversation.module.scss'

const IsTyping = () => {
  return (
    <div className={styles.isTyping}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>

    </div>
  )
}

export default IsTyping