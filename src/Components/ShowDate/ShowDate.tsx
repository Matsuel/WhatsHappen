import React from 'react'
import styles from './ShowDate.module.css'

interface ShowDateProps {
    date: string,
    className?: string,
    color?: string
}

const ShowDate = ({
    date,
    className,
    color
}: ShowDateProps) => {
    return (
        <p
            style={{ color: color }}
            className={className ? styles.messageTime : styles.messageTimeNoM}>
            {
                new Date(date).getHours() + ":" +
                (new Date(date).getMinutes().toString().padStart(2, '0'))
            }
        </p>
    )
}

export default ShowDate