import React from 'react'
import styles from './NoResult.module.scss'
import Image from 'next/image'
import NoResultImg from '@/assets/noresult.svg'

interface NoResultProps {
    content: string
}

const NoResult = ({
    content
}: NoResultProps) => {
    return (
        <div className={styles.conversation + " " + styles.noresult}>
            <div className={styles.convimagestatus}>
                <Image src={NoResultImg} alt="conv1" className={styles.conversationimage} width={0} height={0} />
            </div>
            <div className={styles.conversationinfos}>
                {content}
            </div>
        </div>
    )
}

export default NoResult