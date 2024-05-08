import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import NewConv from '@/assets/NewConv.svg';

interface HeaderProps {
    handleNewConv: Function
}

const Header = ({
    handleNewConv
 }: HeaderProps) => {
    return (
        <div className={styles.header}>
            <button className={styles.editButton}>
                Modifier
            </button>
            <h2 className={styles.headerTitle}>Messages</h2>
            <button className={styles.addConvbtn}>
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
