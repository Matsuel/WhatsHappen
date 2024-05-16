import React, { useState } from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import DisplayAvatar from '../DisplayAvatar/DisplayAvatar'
import Delete from '@/assets/Delete.svg'
import Image from 'next/image'

interface EditModalProps {
    editConversation: boolean,
    setEditConversation: Function,
    edit: boolean,
    setEdit: Function
}

const EditModal = ({
    editConversation,
    setEditConversation,
    edit,
    setEdit
}: EditModalProps) => {

    const router = useRouter()

    const [userInfos, setUserInfos] = useState({
        username: "Mathéo Lang",
        pic: ""
    })

    return (
        <>
        {edit &&
        <div className={styles.editModal}>
            <button className={styles.editAccount}
                onClick={() => {
                    setEdit(false)
                    router.push('/account')
                }}>
                <DisplayAvatar
                    pic={userInfos.pic}
                    size={60}
                />
                <div className={styles.userInfos}>
                    <h3 className={styles.userInfo}>{userInfos.username}</h3>
                    <h4 className={styles.subtitle}>Nom et photo</h4>

                </div>
            </button>
            <button
                className={styles.editItem}
                onClick={() => {
                    setEditConversation(!editConversation)
                    setEdit(!edit)
                }}>
                <p className={styles.editText}>
                    Gérer les conversations
                </p>
                <Image
                    src={Delete}
                    alt="edit"
                    className={styles.editLogo}
                    width={35}
                />
            </button>
        </div>}
        </>
    )
}

export default EditModal