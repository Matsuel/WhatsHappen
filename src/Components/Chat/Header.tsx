import React from 'react'
import Phone from '@/assets/Phone.svg'
import Video from '@/assets/Video.svg'
import SearchConv from '@/assets/SearchConv.svg'
import Expand from '@/assets/Expand.svg'

import styles from './style.module.css'
import Image from 'next/image'
import Avatar from '../Avatar/Avatar'

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
                {pic ? <Image src={`data:image/jpeg;base64,${pic}`} alt="avatar" className={styles.topbarimage} width={0} height={0} /> : <Avatar width={60} height={60} />}
                <div className={styles.topbarnamestatut}>
                    <h2 className={styles.conversationname}>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                    </h2>
                </div>
            </div>
            <div className={styles.topbarright}>
                {/* Composant TopBarBtn prenant en paramètre une image, une fonction onClick */}
                <Image src={Phone} alt="phoneconv" className={styles.toprightbtn} />
                <Image src={Video} alt="video" className={styles.toprightbtn} />
                <Image src={SearchConv} alt="searchconv" className={styles.toprightbtn} onClick={handleSearchConv as any} />
                {showSearchConv ?
                    // <input type="text" name="" id="" placeholder="Rechercher dans la conversation" className={`searchconv searchconvShow`} />
                    <input type="text" name="" id="" placeholder="Rechercher dans la conversation" className={styles.searchconv + " " + styles.searchconvShow} />
                    :
                    null
                }
                {/* Composant TopBarBtn prenant en paramètre une image, une fonction onClick */}
                <Image src={Expand} alt="expand" className={styles.toprightbtn} />
            </div>
        </div>
    )
}

export default Header