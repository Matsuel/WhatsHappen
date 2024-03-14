import React from 'react'
import styles from './NewConversation.module.css'
import NewConv from '@/assets/NewConv.svg'
import Image from 'next/image'

const NewConversation = ({ canRotate, handleNewConv }: { canRotate: boolean, handleNewConv: Function }) => {
    return (
        <div className={styles.newconvdiv + " " + (canRotate ? styles.newConvRotate : '')} onClick={() => handleNewConv()}>
        {/* <div className={`newconv-div ${canRotate ? 'newConv-rotate' : ''}`} onClick={() => handleNewConv()}> */}
            <Image src={NewConv} alt="newconv" className={styles.newConv} />
        </div>
    )
}

export default NewConversation