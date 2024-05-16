import React, { useRef } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import NewConv from '@/assets/NewConv.svg';

interface HeaderProps {
    handleNewConv: Function,
    btnRef: any
}

const Header = ({
    handleNewConv,
    btnRef
 }: HeaderProps) => {

    return (
        <div className={styles.header}>
            <button className={styles.editButton}>
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
