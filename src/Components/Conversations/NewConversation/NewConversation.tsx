import React, { ChangeEventHandler } from 'react'
import styles from './NewConversation.module.css'
import NewConv from '@/assets/NewConv.svg'
import Image from 'next/image'
import NewConversationModal from './NewConversationModal/NewConversationModal'

const NewConversation = ({ canRotate, handleNewConv, showNewConv, setShowNewConv, users, searchUsers, handleSearchUsers, createConversation, clickAwayEffect, setClickAwayEffect }: NewConversationProps) => {

    return (
        <>
            <div className={styles.newconvdiv + " " + (canRotate ? styles.newConvRotate : '')} onClick={() => handleNewConv()}>
                {/* <div className={`newconv-div ${canRotate ? 'newConv-rotate' : ''}`} onClick={() => handleNewConv()}> */}
                <Image src={NewConv} alt="newconv" className={styles.newConv} />
            </div>
            <NewConversationModal showNewConv={showNewConv} setShowNewConv={setShowNewConv} users={users} searchUsers={searchUsers} handleSearchUsers={handleSearchUsers} createConversation={createConversation} clickAwayEffect={clickAwayEffect} setClickAwayEffect={setClickAwayEffect} />
        </>
    )
}

export default NewConversation