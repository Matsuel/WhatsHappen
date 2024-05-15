import React, { ChangeEventHandler, useState } from 'react'
import styles from './Modal.module.scss'
import Image from 'next/image'
import NewConv from '@/assets/NewConv.svg'
import { useClickAway } from '@uidotdev/usehooks'
import { socket } from '@/pages/_app'
import Avatar from '../DisplayAvatar/Avatar'

interface ModalProps {
    showNewConv: boolean,
    setShowNewConv: Function,
    clickAwayEffect: boolean,
    setClickAwayEffect: Function
}


const Modal = ({
    showNewConv,
    setShowNewConv,
    clickAwayEffect,
    setClickAwayEffect
}: ModalProps) => {

    const [users, setUsers] = useState<UserInfos[]>([])

    const handleSearchUsers: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.value.trim() === "") {
            setUsers([])
        } else {
            socket.emit('searchusers', { token: cookies, search: e.target.value.trim() })
        }
    }

    const ref = useClickAway<any>(() => {
        setShowNewConv(false)
        setClickAwayEffect(!clickAwayEffect)
    })

    let cookies = ""
    if (typeof window !== 'undefined') {
        cookies = localStorage.getItem('user') || ''
    }

    const createConversation = async (user_id: string) => {
        socket.emit('newconversation', { cookies, user_id })
        socket.on('newconversation', (data: any) => {
            if (data.created) {
                socket.emit('conversations', { cookies })
                setShowNewConv(false)
                setUsers([])
            } else {
                console.log('Échec de la connexion:', data.error);
            }
        });
    }

    socket.on('searchusers', (data: any) => {
        if (data.users) {
            setUsers(data.users)
        }
    })


    return (
        <>
            {showNewConv ? (
                <div className={styles.newconvmodal} ref={ref}>
                    <input
                        type="text"
                        placeholder='Rechercher ici une nouvelle personne'
                        className={styles.newconvinput}
                        ref={ref}
                        maxLength={50}
                        onChange={handleSearchUsers}
                    />
                    {users.length > 0 && (
                        <div className={styles.users}>
                            {users.map((user) => {
                                return (

                                    <div className={styles.newconvuser} key={user._id}>

                                        {user.pic !== "" ?
                                            <Image
                                                src={`data:image/jpeg;base64,${user.pic}`}
                                                className={styles.userpic}
                                                alt="userpic"
                                                width={0}
                                                height={0}
                                            /> :
                                            <Avatar
                                                width={80}
                                                height={80}
                                            />
                                        }

                                        <p className={styles.username}>
                                            {user.username}
                                        </p>

                                        <div className={styles.actionDiv}>
                                            <Image
                                                src={NewConv}
                                                className={styles.action}
                                                alt="chatbubble"
                                                width={0}
                                                height={0}
                                                onClick={() => createConversation(user._id)}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                </div>

            ) : null}
        </>
    )
}

export default Modal