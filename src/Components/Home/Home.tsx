import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
// @ts-ignore
import Search from '../../assets/Search.svg'
import './Home.css'

interface ConversationInfos {
    _id: string,
    users_id: string[],
    name : string
}

const Home = () => {
    const [conversations, setConversations] = useState<ConversationInfos[]>([])
    const [conversationActive, setConversationActive] = useState<string>('')
    const [search, setSearch] = useState<string>('')
    const [typeConv, setTypeConv] = useState<number>(1)

    const cookies = Cookies.get('user')
    
    const getConversations = async () => {
        axios.post('http://localhost:3001/conversations', {cookies})
        .then(res => {
            setConversations(res.data.conversations)
        })
    }

    useEffect(() => {
        getConversations()
    }, [])

    const handleConversationActive = (conversationId : string) => {
        if (conversationId === conversationActive) {
            setConversationActive('')
            return
        }
        setConversationActive(conversationId)
    }

    const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        console.log(search)
    }


    return (
        <div className="home">
            <div className="conversations-section">
                <div className="searchBar">
                    <img src={Search} alt="search" className='searchLogo' />
                    <input type="text" placeholder='Rechercher une conversation ici' name="search" id="search" className='convSearch' onChange={handleSearch} />
                </div>

                <div className="convstype">
                    <div className={`convtype ${typeConv === 1 ? 'convtypeActive' : ''}`} onClick={() => setTypeConv(1)}>
                        Conversations
                    </div>
                    <div className={`convtype ${typeConv === 2 ? 'convtypeActive' : ''}`} onClick={() => setTypeConv(2)}>
                        Groupes
                    </div>
                    <div className={`convtype ${typeConv === 3 ? 'convtypeActive' : ''}`} onClick={() => setTypeConv(3)}>
                        Contacts
                    </div>
                </div>

                {
                    typeConv === 1 ? (
                        (
                            conversations.map((conversation) => {
                                return (
                                    (
                                        conversation.name.toLowerCase().includes(search.toLowerCase()) ? (
                                            <div className={`conversation ${conversation._id === conversationActive ? 'conversationActive' : ''}`} onClick={() => handleConversationActive(conversation._id)} key={conversation._id}>
                                                <p>{conversation.name}</p>
                                            </div>
                                        ) : null
                                    )
                                )
                            })
                        )
                    ) : null
                }


                {/* {conversations.map((conversation) => {
                    return (
                        (
                            conversation.name.toLowerCase().includes(search.toLowerCase()) ? (
                                <div className={`conversation ${conversation._id === conversationActive ? 'conversationActive' : ''}`} onClick={() => handleConversationActive(conversation._id)} key={conversation._id}>
                                    <p>{conversation.name}</p>
                                </div>
                            ) : null
                        )
                    )
                })} */}
            </div>

            <div className="messages-section">

            </div>

        </div>
    )
}

export default Home
