import React from 'react'
import styles from './SearchbarConv.module.css'
import Search from '@/assets/Search.svg'
import Image from 'next/image'
import { handleSearch } from '../../../Functions/SearchBars/Search'

const SearchbarConv = ({ setSearch, setHasMatchingConversations, conversations }: { setSearch: Function, setHasMatchingConversations: Function, conversations: ConversationInfos[] }) => {
    return (
        <div className={styles.searchBar}>
            <Image src={Search} alt="search" className={styles.searchLogo} />
            <input type="text" placeholder='Rechercher une conversation ici' name="search" id="search" className={styles.convSearch} onChange={(e) => handleSearch(e, setSearch, setHasMatchingConversations, conversations)} />
        </div>
    )
}

export default SearchbarConv