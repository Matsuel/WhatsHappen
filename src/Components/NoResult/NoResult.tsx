import React from 'react'
import styles from './NoResult.module.css'
import Image from 'next/image'
import NoResultImg from '@/assets/noresult.svg'

const NoResult = ({ content }: { content: string }) => {
    return (
        // <div className="conversation noresult">
        <div className={styles.conversation + " " + styles.noresult}>
            <div className={styles.convimagestatus}>
                <Image src={NoResultImg} alt="conv1" className={styles.conversationimage} width={0} height={0} />
            </div>
            <div className={styles.conversationinfos}>
                <div>{content}</div>
            </div>
        </div>
    )
}

export default NoResult