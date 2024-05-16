import React, { useState } from 'react'
import styles from './styles.module.scss'
import Search from '@/assets/Search.svg'
import Image from 'next/image'
import { handleSearch } from '../../Functions/SearchBars/Search'

interface SearchbarProps {
    setSearch: Function,
    setHasMatchingConversations: Function,
    conversations: ConversationInfos[],
    search: string
}

const Searchbar = ({
    setSearch,
    setHasMatchingConversations,
    conversations,
    search
}: SearchbarProps) => {

    const [isFocused, setIsFocused] = useState<boolean>(false)


    return (
        <div className={styles.searchWrapper}>
            <div className={styles.searchBar}>
                <Image src={Search} alt="search" className={styles.searchLogo} />
                <input
                    type="text"
                    placeholder='Recherche'
                    name="search"
                    id="search"
                    autoComplete='off'
                    className={styles.searchInput}
                    onChange={(e) => handleSearch(e, setSearch, setHasMatchingConversations, conversations)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={search}
                />
            </div>

            <button
                className={styles.cancelBtn}
                style={{ display: isFocused ? 'block' : 'none' }}
            >
                Annuler
            </button>
        </div>
    )
}

export default Searchbar