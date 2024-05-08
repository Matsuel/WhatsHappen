import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import NoResult from '../NoResult/NoResult'
import Conversation from './Conversation/Conversation'
import SearchbarConv from '../SearchbarConv/SearchbarConv'
import { decodeToken } from 'react-jwt'
import { socket } from '@/pages/_app'
import PinnedConversations from '@/Components/PinnedConversations/PinnedConversations'
import Header from './Header'

interface ConversationListProps {
    conversationActive: string,
    handleConversationActive: Function,
    search: string,
    typingStatus: {},
    handleNewConv: Function,
    setSearch: Function
}

const ConversationsList = ({
    conversationActive,
    handleConversationActive,
    search,
    typingStatus,
    handleNewConv,
    setSearch
}: ConversationListProps) => {

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

    socket.on('conversations', (data: any) => {
        data.conversations ? setConversations(data.conversations) : console.log('Échec de la connexion:', data.error);
    });

    socket.on('pinconversation', (data: any) => {
        if (data.pinned) {
            socket.emit('conversations', { cookies })
        }
    })


    useEffect(() => {
        getConversations()
    }, [])

    const notPinnedConversations = conversations.filter((conv) => !conv.pinnedBy.includes(userId))

    return (
        <div className={styles.conversationssection}>

            <Header
                handleNewConv={handleNewConv}
            />

            <SearchbarConv
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

                        const classActive = conversation._id === conversationActive ? styles.conversationActive : ''

                        const noConvActiveClass = conversationActive === "" ? styles.noActiveClass : ''

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

export default ConversationsList