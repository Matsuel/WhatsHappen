import React, { useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'

interface MessageDateProps {
    message: message
}


const MessageDate = ({
    message
}: MessageDateProps) => {


    const [width, setWidth] = useState<number>(0)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setWidth(ref.current?.offsetWidth as number)
    }, [])

    const today = new Date(message.date).toDateString() === new Date().toDateString()
    const yesterday = new Date(message.date).toDateString() === new Date(Date.now() - 86400000).toDateString()
    const formatedDate = new Date(message.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    let displayDate;
    if (today) {
        displayDate = "Aujourd'hui"
    } else if (yesterday) {
        displayDate = "Hier"
    } else {
        displayDate = formatedDate
    }

    return (
        <div className={styles.messageday}>
            <div
                style={{ width: "calc(50% - " + (width / 2 + 30) + "px)" }}
                className={styles.messagedayline}></div>
            <p className={styles.messagedaytext} ref={ref}>
                {displayDate}
            </p>
            <div style={{ width: "calc(50% - " + (width / 2 + 50) + "px)" }} className={styles.messagedayline}></div>
        </div>
    )
}

export default MessageDate