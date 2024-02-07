import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
// @ts-ignore
import Search from '../../assets/Search.svg'
import './Home.css'

interface ConversationInfos {
    _id: string,
    users_id: string[]
}

const Home = () => {
    const [conversations, setConversations] = useState<ConversationInfos[]>([])

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


    return (
        <div className="home">
            <div className="conversations-section">
                <div className="searchBar">
                    <img src={Search} alt="search" className='searchLogo' />
                    <input type="text" placeholder='Rechercher une conversation ici' name="search" id="search" className='convSearch' />
                </div>
                {conversations.map((conversation, index) => {
                    return (
                        <div key={index} className="conversation">
                            <p>{conversation._id}</p>
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
