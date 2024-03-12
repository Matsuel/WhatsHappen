const handleSearch = (e: React.ChangeEvent<HTMLInputElement>, setSearch: Function, setHasMatchingConversations:Function, conversations: ConversationInfos[]) =>{
    setSearch(e.target.value.trim())
    e.target.value.trim() === "" ? setHasMatchingConversations(true) :
        setHasMatchingConversations(conversations.some((conv) => conv.name.toLowerCase().includes(e.target.value.toLowerCase())))
}

export { handleSearch }