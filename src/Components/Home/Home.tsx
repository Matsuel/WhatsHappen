import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
// @ts-ignore
import Search from '../../assets/Search.svg'
// @ts-ignore
import NewConv from '../../assets/NewConv.svg'
// @ts-ignore
import Conv1 from '../../assets/conv1.svg'
// @ts-ignore
import Online from '../../assets/Online.svg'
// @ts-ignore
import Phone from '../../assets/Phone.svg'
// @ts-ignore
import Video from '../../assets/Video.svg'
// @ts-ignore
import SearchConv from '../../assets/SearchConv.svg'
// @ts-ignore
import Expand from '../../assets/Expand.svg'

import './Home.css'

interface ConversationInfos {
    _id: string,
    users_id: string[],
    name: string
}

interface UserInfos {
    username: string,
    _id: string
}

const Home = () => {
    const [conversations, setConversations] = useState<ConversationInfos[]>([])
    const [conversationActive, setConversationActive] = useState<string>('')
    const [search, setSearch] = useState<string>('')
    const [searchUsers, setSearchUsers] = useState<string>('')
    const [typeConv, setTypeConv] = useState<number>(1)
    const [showNewConv, setShowNewConv] = useState<boolean>(false)
    const [canRotate, setCanRotate] = useState<boolean>(false)
    const [users, setUsers] = useState<UserInfos[]>([])

    const cookies = Cookies.get('user')

    const getConversations = async () => {
        axios.post('http://localhost:3001/conversations', { cookies })
            .then(res => {
                setConversations(res.data.conversations)
            })
    }

    const getUsers = async () => {
        axios.post('http://localhost:3001/users', { cookies })
            .then(res => {
                console.log(res.data.users)
                setUsers(res.data.users)
            })
    }

    useEffect(() => {
        getConversations()
    }, [])

    const handleConversationActive = (conversationId: string) => {
        if (conversationId === conversationActive) {
            setConversationActive('')
            return
        }
        setConversationActive(conversationId)
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleSearchUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchUsers(e.target.value.trim())
    }

    const createConversation = async (user_id: string) => {
        axios.post('http://localhost:3001/newconversation', { cookies, user_id })
            .then(res => {
                if (res.data.created) {
                    getConversations()
                    getUsers()
                }
            })
    }

    const handleNewConv = () => {
        getUsers()
        setShowNewConv(!showNewConv)
        setCanRotate(true)
        rotateForSec()
    }

    const rotateForSec = () => {
        setTimeout(() => {
            setCanRotate(false)
        }, 500)
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

                <div className="convslist">
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
                </div>

                {showNewConv ? (
                    <div className="newconvmodal">
                        <input type="text" placeholder='Nom de votre interlocuteur' className='newconvinput' onChange={handleSearchUsers} />
                        {users.length > 0 ? (
                            users.map((user) => {
                                return (
                                    user.username.toLowerCase().includes(searchUsers.toLowerCase()) ? (
                                        <div className="newconvuser" key={user._id} onClick={() => createConversation(user._id)}>
                                            <p>{user.username}</p>
                                        </div>
                                    ) : null
                                )
                            }
                            )
                        ) : null}
                    </div>
                ) : null}

                <div className={`newconv-div ${canRotate ? 'newConv-rotate' : ''}`} onClick={() => handleNewConv()}>
                    <img src={NewConv} alt="newconv" className='newConv' />
                </div>
            </div>

            <div className="messages-section">
                <div className="conversationtopbar">
                    <div className="topbarleft">
                        <img src={Conv1} alt="conv1" className='conv1' />
                        <div className="topbarnamestatut">
                            <h2 className="conversationname">
                                Nom de la conversation
                            </h2>
                            <p className="conversationstatus">
                                <img src={Online} alt="online" className='online' />
                                Statut de la conversation
                            </p>
                        </div>
                        
                    </div>

                    <div className="topbarright">
                        <img src={Phone} alt="phoneconv" className='toprightbtn' />
                        <img src={Video} alt="video" className='toprightbtn' />
                        <img src={SearchConv} alt="searchconv" className='toprightbtn' />
                        <img src={Expand} alt="expand" className='toprightbtn' />
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Home
