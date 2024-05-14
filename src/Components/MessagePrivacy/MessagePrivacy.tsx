import React from 'react'
import Security from '@/assets/Security.svg'
import Image from 'next/image'
import styles from './MessagePrivacy.module.scss'

const MessagePrivacy = () => {
    return (
        <div className={styles.messageprivacy}>
            <Image src={Security} alt="security" className={styles.security} />
            <p className={styles.securitymessage}>Les messages sont chiffrés de bout en bout. Personne en dehors de ce chat, pas même Whatshappen, ne peut les lire ou les écouter, cliquez pour en savoir plus.</p>
        </div>
    )
}

export default MessagePrivacy
