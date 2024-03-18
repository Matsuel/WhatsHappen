import React, { ChangeEventHandler, useState } from 'react'
import styles from './NewConversationModal.module.css'
import Conv1 from '@/assets/conv1.svg'
import Image from 'next/image'
import ChatBubble from '@/assets/ChatBubble.svg'
import AddContact from '@/assets/AddContact.svg'
import { useClickAway } from '@uidotdev/usehooks'

const NewConversationModal = ({ showNewConv, setShowNewConv, users, searchUsers, handleSearchUsers, createConversation, clickAwayEffect, setClickAwayEffect }: NewConversationModalProps) => {

    const ref = useClickAway<any>(() => {
        setShowNewConv(false)
        setClickAwayEffect(!clickAwayEffect)
    })


    return (
        <>
            {showNewConv ? (
                // Finir le style
                <div className={styles.newconvmodal} ref={ref}>
                    <input type="text" placeholder='Nom de votre interlocuteur' className={styles.newconvinput} onChange={handleSearchUsers} ref={ref} />
                    {users.length > 0 && searchUsers !== "" ? (
                        <div className={styles.users}>
                            {users.map((user, index) => {
                                return (
                                    user.username.toLowerCase().includes(searchUsers.toLowerCase()) ? (
                                        <div className={styles.newconvuser} key={user._id}>
                                            <Image src={user.pic !== "" ? `data:image/jpeg;base64,${user.pic}` : Conv1} className={styles.userpic} alt="userpic" width={0} height={0} />
                                            <p className={styles.username}>{user.username}</p>
                                            <div className={styles.actions}>
                                                <div className={styles.actionDiv}>
                                                    <Image
                                                        src={ChatBubble}
                                                        className={styles.action}
                                                        alt="chatbubble"
                                                        width={0}
                                                        height={0}
                                                        onClick={() => createConversation(user._id)}
                                                    />
                                                </div>
                                                <div className={styles.actionDiv}>
                                                    <Image
                                                        src={AddContact}
                                                        className={styles.action}
                                                        alt="addcontact"
                                                        width={0}
                                                        height={0}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : null
                                )
                            })}
                        </div>
                    ) : null}

                </div>

            ) : null}
        </>
    )
}

export default NewConversationModal