import React from 'react'
import styles from './ShowDate.module.css'

const ShowDate = ({ date, className }: { date: string, className?: string }) => {
    return (
        <p className={className ? styles.messageTime : styles.messageTimeNoM}>
            {
                new Date(date).getHours() + ":" +
                (new Date(date).getMinutes().toString().padStart(2, '0'))
            }
        </p>
    )
}

export default ShowDate