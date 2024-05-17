import React from 'react'
import styles from '@/styles/WelcomePage.module.css'
import Image from 'next/image'
import WhatsappGif from '@/assets/whatsapp.gif'
import CustomHead from '@/Components/CustomHead/CustomHead'

const WelcomePage = () => {
  return (
    <div className={styles.welcomePage}>
      <CustomHead title="iMessage" />
      <div className={styles.titleDiv}>
        <h1 className={styles.title}>Bienvenue sur WhatsApp</h1>
        <Image src={WhatsappGif} alt="WhatsappGif" className={styles.gif} />
        <h2 className={styles.subTitle}>Un moyen simple, fiable et confidentiel d'utiliser WhastApp sur votre ordinateur</h2>
        <button className={styles.button}>Démarrer</button>
        <h2 className={styles.version}>v0.1</h2>
      </div>
    </div>
  )
}

export default WelcomePage