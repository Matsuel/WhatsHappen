import React, { ChangeEventHandler } from 'react'
import styles from './NewConversationModal.module.css'
import Conv1 from '@/assets/conv1.svg'
import Image from 'next/image'
import Cross from '@/assets/cross.svg'

const NewConversationModal = ({ showNewConv,setShowNewConv, users, searchUsers, handleSearchUsers, createConversation }: { showNewConv: boolean, setShowNewConv: Function, users: UserInfos[], searchUsers: string, handleSearchUsers: ChangeEventHandler<HTMLInputElement>, createConversation: Function }) => {
    return (
        <>
            {showNewConv ? (
                <div className={styles.newconvmodal}>
                    <Image src={Cross} alt="cross" className={styles.cross} onClick={() => setShowNewConv(false)} />
                    <input type="text" placeholder='Nom de votre interlocuteur' className={styles.newconvinput} onChange={handleSearchUsers} />
                    {users.length > 0 && searchUsers !== "" ? (
                        users.map((user) => {
                            return (
                                user.username.toLowerCase().includes(searchUsers.toLowerCase()) ? (
                                    // Composant userDatas
                                    <div className={styles.newconvuser} key={user._id} onClick={() => createConversation(user._id)}>
                                        <Image src={user.pic !== "" ? `data:image/jpeg;base64,${user.pic}` : Conv1} className={styles.userpic} alt="userpic" />
                                        <p className={styles.username}>{user.username}</p>
                                    </div>
                                ) : null
                            )
                        })
                        // Renvoyer un composant NoResult
                    ) : null}
                </div>
            ) : null}
        </>
    )
}

export default NewConversationModal