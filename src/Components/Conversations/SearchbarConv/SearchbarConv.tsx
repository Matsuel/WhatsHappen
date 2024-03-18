import React from 'react'
import styles from './SearchbarConv.module.css'
import Search from '@/assets/Search.svg'
import Image from 'next/image'
import { handleSearch } from '../../../Functions/SearchBars/Search'
import Plus from '@/assets/Plus.svg'

interface SearchbarConvProps {
    setSearch: Function,
    setHasMatchingConversations: Function,
    conversations: ConversationInfos[],
    handleNewConv: Function
}

const SearchbarConv = ({ setSearch, setHasMatchingConversations, conversations, handleNewConv }: SearchbarConvProps) => {
    return (
        <div className={styles.searchWrapper}>
            <div className={styles.searchBar}>
                <Image src={Search} alt="search" className={styles.searchLogo} />
                <input type="text" placeholder='Rechercher une conversation ici' name="search" id="search" className={styles.searchInput} onChange={(e) => handleSearch(e, setSearch, setHasMatchingConversations, conversations)} />
            </div>
            <div className={styles.newConv} onClick={() => handleNewConv()}>
                <Image src={Plus} alt="add" className={styles.addLogo} />
            </div>
        </div>
    )
}

export default SearchbarConv