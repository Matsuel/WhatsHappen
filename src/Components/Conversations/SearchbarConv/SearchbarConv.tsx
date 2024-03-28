import React from 'react'
import styles from './SearchbarConv.module.css'
import Search from '@/assets/Search.svg'
import Image from 'next/image'
import { handleSearch } from '../../../Functions/SearchBars/Search'
import Plus from '@/assets/Plus.svg'
import Minus from '@/assets/Minus.svg'

interface SearchbarConvProps {
    setSearch: Function,
    setHasMatchingConversations: Function,
    conversations: ConversationInfos[],
    handleNewConv: Function,
    showFullSidebar: boolean,
    setShowFullSidebar: Function,
    showNewConv: boolean,
}

const SearchbarConv = ({ setSearch, setHasMatchingConversations, conversations, handleNewConv, setShowFullSidebar, showFullSidebar, showNewConv }: SearchbarConvProps) => {

    
    return (
        <div className={showFullSidebar ? styles.searchWrapper : styles.searchWrapperMinimized}>
            {showFullSidebar ? (
                <div className={styles.searchBar}>
                    <Image src={Search} alt="search" className={styles.searchLogo} />
                    <input type="text" placeholder='Rechercher ici' name="search" id="search" className={styles.searchInput} onChange={(e) => handleSearch(e, setSearch, setHasMatchingConversations, conversations)} />
                </div>
            ) : (
                <div className={styles.logoMinimized} onClick={() => setShowFullSidebar(true)}>
                    <Image src={Search} alt="search" className={styles.addLogo} />
                </div>
            )}
            <div className={showFullSidebar ? styles.newConv : styles.logoMinimized} onClick={() => handleNewConv()}>
                <Image src={showNewConv ? Minus : Plus} alt="add" className={styles.addLogo} />
            </div>
        </div>
    )
}

export default SearchbarConv