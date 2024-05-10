import React, { useEffect, useRef, useState } from 'react'

import styles from './MessageDate.module.css'

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

    return (
        <div className={styles.messageday}>
            <div
                style={{ width: "calc(50% - " + (width / 2 + 50) + "px)" }}
                className={styles.messagedayline}></div>
            <p className={styles.messagedaytext} ref={ref}>
                {
                    today ?
                        "Aujourd'hui" :
                        yesterday ?
                            "Hier" :
                            formatedDate
                }
            </p>
            <div style={{ width: "calc(50% - " + (width / 2 + 50) + "px)" }} className={styles.messagedayline}></div>
        </div>
    )
}

export default MessageDate