import React from 'react'
import './SearchbarConv.css'
import Search from '../../../assets/Search.svg'
import { handleSearch } from '../../../Functions/SearchBars/Search'

const SearchbarConv = ({ setSearch, setHasMatchingConversations, conversations }: { setSearch: Function, setHasMatchingConversations: Function, conversations: ConversationInfos[] }) => {
    return (
        <div className="searchBar">
            <img src={Search} alt="search" className='searchLogo' />
            <input type="text" placeholder='Rechercher une conversation ici' name="search" id="search" className='convSearch' onChange={(e) => handleSearch(e, setSearch, setHasMatchingConversations, conversations)} />
        </div>
    )
}

export default SearchbarConv