import React from 'react'
import Phone from '@/assets/Phone.svg'
import Video from '@/assets/Video.svg'
import SearchConv from '@/assets/SearchConv.svg'
import Expand from '@/assets/Expand.svg'
import styles from './style.module.scss'
import Image from 'next/image'
import { capitalize } from '@/Functions/Utils/capitalize'
import DisplayAvatar from '../DisplayAvatar/DisplayAvatar'

interface HeaderProps {
    name: string,
    pic: string,
    handleSearchConv: Function,
    showSearchConv: boolean,
}

const Header = ({
    name,
    pic,
    handleSearchConv,
    showSearchConv
}: HeaderProps) => {

    return (
        <div className={styles.conversationtopbar}>
            <div className={styles.topbarleft}>
                <DisplayAvatar pic={pic} size={60} />
                <h2 className={styles.conversationname}>
                    {capitalize(name)}
                </h2>
            </div>

            <div className={styles.topbarright}>
                <Image src={Phone} alt="phoneconv" className={styles.toprightbtn} />
                <Image src={Video} alt="video" className={styles.toprightbtn} />
                <Image src={SearchConv} alt="searchconv" className={styles.toprightbtn} onClick={handleSearchConv as any} />
                {showSearchConv && <input type="text" name="" id="" placeholder="Rechercher dans la conversation" className={styles.searchconv + " " + styles.searchconvShow} />}
                <Image src={Expand} alt="expand" className={styles.toprightbtn} />
            </div>
        </div>
    )
}

export default Header
