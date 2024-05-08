import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import NoResult from '../NoResult/NoResult'
import Conversation from './Conversation/Conversation'
import SearchbarConv from '../SearchbarConv/SearchbarConv'
import { decodeToken } from 'react-jwt'
import { socket } from '@/pages/_app'
import PinnedConversations from '@/Components/PinnedConversations/PinnedConversations'
import ExpandBtn from './ExpandBtn'
import Header from './Header'

interface ConversationListProps {
    conversationActive: string,
    handleConversationActive: Function,
    search: string,
    typingStatus: {},
    showFullSidebar: boolean,
    setShowFullSidebar: Function,
    handleNewConv: Function,
    setSearch: Function,
    showNewConv: boolean
}

const ConversationsList = ({
    conversationActive,
    handleConversationActive,
    search,
    typingStatus,
    setShowFullSidebar,
    showFullSidebar,
    handleNewConv,
    setSearch,
    showNewConv
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
        socket.on('conversations', (data: any) => {
            data.conversations ? setConversations(data.conversations) : console.log('Échec de la connexion:', data.error);
        });
    }

    const handlePinnedConversation = (conversation_id: string) => {
        socket.emit('pinconversation', { cookies, conversation_id })
        socket.on('pinconversation', (data: any) => {
            if (data.pinned) {
                socket.emit('conversations', { cookies })
            }
        })
    }


    useEffect(() => {
        getConversations()
    }, [conversationActive])



    const pinnedConversations = conversations.filter((conv) => conv.pinnedBy.includes(userId))

    const conversationsFiltered = [
        {
            name: "Conversations",
            conversations: conversations.filter((conv) => !conv.pinnedBy.includes(userId)),
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" /></svg>
        }
    ]

    return (
        <div className={showFullSidebar ? styles.conversationssection : styles.conversationsMinimized}>

            <Header
                handleNewConv={handleNewConv}
            />

            <SearchbarConv
                setSearch={setSearch}
                conversations={conversations}
                handleNewConv={handleNewConv}
                setHasMatchingConversations={setHasMatchingConversations}
                showFullSidebar={showFullSidebar}
                setShowFullSidebar={setShowFullSidebar}
                showNewConv={showNewConv}
            />

            <div className={styles.conversations}>

                <div className={styles.ConversationsList}>

                    <PinnedConversations
                        pinnedConversations={pinnedConversations}
                        conversationActive={conversationActive}
                        handleConversationActive={handleConversationActive}
                        search={search}
                        showFullSidebar={showFullSidebar}
                    />

                    {conversationsFiltered.map((convtype) => {
                        return (
                            <>
                                <h2 className={styles.title}>
                                    {convtype.icon}
                                    {showFullSidebar ? convtype.name : null}
                                </h2>
                                {convtype.conversations.map((conversation) => {

                                    const classActive = conversation._id === conversationActive ? styles.conversationActive : ''

                                    const noConvActiveClass = conversationActive === "" ? styles.noActiveClass : ''

                                    return (
                                        conversation.name.toLowerCase().includes(search.toLowerCase()) ? (
                                            <Conversation
                                                conversation={conversation}
                                                handleConversationActive={handleConversationActive}
                                                typingStatus={typingStatus}
                                                handlePinnedConversation={handlePinnedConversation}
                                                userId={userId}
                                                classActive={classActive}
                                                noConvActiveClass={noConvActiveClass}
                                                showFullSidebar={showFullSidebar}
                                            />
                                        ) : null
                                    )
                                })}
                            </>
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

                <ExpandBtn
                    setShowFullSidebar={setShowFullSidebar}
                    showFullSidebar={showFullSidebar}
                />

            </div>
        </div>
    )
}

export default ConversationsList