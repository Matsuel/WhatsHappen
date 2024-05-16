import React, { useRef } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import NewConv from '@/assets/NewConv.svg';

interface HeaderProps {
    handleNewConv: Function,
    btnRef: any,
    handleEditModal: Function
}

const Header = ({
    handleNewConv,
    btnRef,
    handleEditModal
 }: HeaderProps) => {

    return (
        <div className={styles.header}>
            <button className={styles.editButton} onClick={() => handleEditModal()}>
                Modifier
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
        </div>
    );
};

export default Header;
