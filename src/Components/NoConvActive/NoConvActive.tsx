import React from 'react'
import Image from 'next/image'
import styles from './NoConvActive.module.scss'
import Logo from '@/assets/Logo.svg'

const NoConvActive = () => {
    return (
        <div className={styles.noconvactive}>
            <Image src={Logo} alt="phoneconv" className='phoneconv' />
            <h1 className={styles.noconvtitleactive}>Gardez votre téléphone connecté</h1>
            <p className={styles.noconvsubtitleactive}>Whatsapp se connecte à votre téléphone pour synchroniser les messages. Pour réduire l’utilisation des données. connectez votre téléphone au Wi-Fi.</p>
        </div>
    )
}

export default NoConvActive
