import React, { useRef, useState } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import NewConv from '@/assets/NewConv.svg';
import EditModal from './EditModal';

interface HeaderProps {
    handleNewConv: Function,
    btnRef: any,
    editConversation: boolean,
    setEditConversation: Function
}

const Header = ({
    handleNewConv,
    btnRef,
    editConversation,
    setEditConversation
 }: HeaderProps) => {

    const [edit, setEdit] = useState<boolean>(false)

    const handleEditModal = () => {
        setEdit(!edit)
    }

    const editRef = useRef(null)

    return (
        <div className={styles.header}>
            <button className={styles.editButton} onClick={() => editConversation ? setEditConversation(false) : handleEditModal()} ref={editRef}>
                {editConversation ? 'Annuler' : 'Modifier'}
            </button>
            <h2 className={styles.headerTitle}>Messages</h2>
            <button className={styles.addConvbtn} ref={btnRef}>
                <Image
                    src={NewConv}
                    alt="add"
                    className={styles.addLogo}
                    onClick={() => handleNewConv()}
                />
            </button>

            <EditModal 
                editConversation={editConversation}
                setEditConversation={setEditConversation}
                edit={edit}
                setEdit={setEdit}
                editRef={editRef}
            />
        </div>
    );
};

export default Header;
