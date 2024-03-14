import React from 'react'

import styles from './MessageDate.module.css'

const MessageDate = ({ message }: MessageDateProps) => {
    const today = new Date(message.date).toDateString() === new Date().toDateString()
    const yesterday = new Date(message.date).toDateString() === new Date(Date.now() - 86400000).toDateString()
    const formatedDate = new Date(message.date).toLocaleDateString('fr-FR',{ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}).split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    return (
        <div className={styles.messageday}>
            <p>{
                today ?
                "Aujourd'hui" :
                yesterday ?
                "Hier" :
                formatedDate
                }
            </p>
        </div>
    )
}

export default MessageDate