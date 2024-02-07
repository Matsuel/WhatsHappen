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


    return (
        <div className="home">
            <div className="conversations-section">
                <div className="searchBar">
                    <img src={Search} alt="search" className='searchLogo' />
                    <input type="text" placeholder='Rechercher une conversation ici' name="search" id="search" className='convSearch' />
                </div>
                {conversations.map((conversation) => {
                    return (
                        <div className={`conversation ${conversation._id === conversationActive ? 'conversationActive' : ''}`} onClick={() => handleConversationActive(conversation._id)}>
                            <p>{conversation.name}</p>
                        </div>
                    )
                })}
            </div>

            <div className="messages-section">

            </div>

        </div>
    )
}

export default Home
