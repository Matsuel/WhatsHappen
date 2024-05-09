import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import NoResult from '../NoResult/NoResult'
import Conversation from '@/Components/Conversation/Conversation'
import Searchbar from './Searchbar'
import { decodeToken } from 'react-jwt'
import { socket } from '@/pages/_app'
import PinnedConversations from '@/Components/PinnedConversations/PinnedConversations'
import Header from './Header'

interface SidebarProps {
    conversationActive: string,
    handleConversationActive: Function,
    search: string,
    typingStatus: {},
    handleNewConv: Function,
    setSearch: Function
}

const Sidebar = ({
    conversationActive,
    handleConversationActive,
    search,
    typingStatus,
    handleNewConv,
    setSearch
}: SidebarProps) => {

    const [conversations, setConversations] = useState<ConversationInfos[]>([])
    const conversationsNoResult: string = "Aucune conversation trouvée"
    const [hasMatchingConversations, setHasMatchingConversations] = useState<boolean>(true)

    let cookies = ""
    let userId = ""
    if (typeof window !== 'undefined') {
        cookies = localStorage.getItem('user') || ''
        const token: User | null = decodeToken(cookies)
        userId = token?.userId as string
    }

    const getConversations = async () => {
        socket.emit('conversations', { cookies })
    }

    


    useEffect(() => {
        getConversations()

        socket.on('conversations', (data: any) => {
            console.log(data)
            data.conversations ? setConversations(data.conversations) : console.log('Échec de la connexion:', data.error);
        });
    
        socket.on('pinconversation', (data: any) => {
            if (data.pinned) {
                socket.emit('conversations', { cookies })
            }
        })
    }, [])

    const notPinnedConversations = conversations.filter((conv) => !conv.pinnedBy.includes(userId))

    return (
        <div className={styles.conversationssection}>

            <Header
                handleNewConv={handleNewConv}
            />

            <Searchbar
                setSearch={setSearch}
                conversations={conversations}
                setHasMatchingConversations={setHasMatchingConversations}
                search={search}
            />

            <div className={styles.conversations}>

                <div className={styles.ConversationsList}>

                    <PinnedConversations
                        pinnedConversations={conversations.filter((conv) => conv.pinnedBy.includes(userId))}
                        conversationActive={conversationActive}
                        handleConversationActive={handleConversationActive}
                        search={search}
                    />

                    {notPinnedConversations.map((conversation) => {

                        const classActive = conversation._id === conversationActive

                        const noConvActiveClass = conversationActive === ""

                        return (
                            conversation.name.toLowerCase().includes(search.toLowerCase()) && (
                                <Conversation
                                    conversation={conversation}
                                    handleConversationActive={handleConversationActive}
                                    typingStatus={typingStatus}
                                    userId={userId}
                                    classActive={classActive}
                                    noConvActiveClass={noConvActiveClass}
                                />
                            )
                        )
                    })}
                    {
                        !hasMatchingConversations ? (
                            <NoResult
                                content={conversationsNoResult}
                            />
                        ) : (
                            null
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar