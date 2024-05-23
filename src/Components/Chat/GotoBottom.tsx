import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { socket } from '@/pages/_app'

interface GotoBottomProps {
    conversationActive: string,
    scrollBottomRef: any
}

const GotoBottom = ({
    conversationActive,
    scrollBottomRef
}: GotoBottomProps) => {

    const [showGotoBottom, setShowGotoBottom] = useState<boolean>(false)
    const [bottom, setBottom] = useState<boolean>(false)

    socket.on('typing', (data: any) => {
        if (data.conversationId === conversationActive) {
            setShowGotoBottom(data.typing)
        }
    })

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setBottom(false)
                } else {
                    setBottom(true)
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 1.0
            }
        );

        if (scrollBottomRef.current) {
            observer.observe(scrollBottomRef.current);
        }

        return () => {
            if (scrollBottomRef.current) {
                observer.unobserve(scrollBottomRef.current);
            }
        };
    }, []);

    const scrollToBottom = () => {
        scrollBottomRef.current.scrollIntoView(
            { behavior: "smooth" }
        )
    }

    return (
        <button
            style={{ display: showGotoBottom && bottom ? 'block' : 'none' }}
            className={styles.gotoBottom}
            onClick={() => scrollToBottom()}
        >
        </button>
    )
}

export default GotoBottom