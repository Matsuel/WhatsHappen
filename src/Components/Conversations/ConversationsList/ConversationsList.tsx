import React, { MouseEventHandler, useEffect, useState } from 'react'
import styles from './ConversationsList.module.css'
import NoResult from '../NoResult/NoResult'
import Conversation from './Conversation/Conversation'
import SearchbarConv from '../SearchbarConv/SearchbarConv'
import { decodeToken } from 'react-jwt'
import { socket } from '@/pages/_app'

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

    const handleShowFullSidebar = () => {
        setShowFullSidebar(!showFullSidebar)
    }


    useEffect(() => {
        getConversations()
    }, [conversationActive])

    const [hovered, setHovered] = useState<Boolean>(false)

    const conversationsFiltered = [
        {
            name: "Pin",
            conversations: conversations.filter((conv) => conv.pinnedBy.includes(userId)),
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 48 48"><path fill="" stroke="" stroke-linejoin="round" stroke-width="4" d="M10.6963 17.5042C13.3347 14.8657 16.4701 14.9387 19.8781 16.8076L32.62 9.74509L31.8989 4.78683L43.2126 16.1005L38.2656 15.3907L31.1918 28.1214C32.9752 31.7589 33.1337 34.6647 30.4953 37.3032C30.4953 37.3032 26.235 33.0429 22.7171 29.525L6.44305 41.5564L18.4382 25.2461C14.9202 21.7281 10.6963 17.5042 10.6963 17.5042Z" /></svg>
        },
        {
            name: "Conversations",
            conversations: conversations.filter((conv) => !conv.pinnedBy.includes(userId)),
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" /></svg>
        }
    ]

    return (
        <div className={showFullSidebar ? styles.conversationssection : styles.conversationsMinimized}>

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
                <div className={styles.ConversationsBtnArea}
                    style={{
                        left: showFullSidebar ? "25%" : "11%"
                    }}
                    onClick={handleShowFullSidebar}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >

                    <div
                        className={styles.Chevron}
                        style={{
                            transform: hovered ? (showFullSidebar ? "rotate(-45deg)" : "rotate(45deg)") : "rotate(0deg)",
                            marginTop: "0.45em"
                        }}
                    />
                    <div
                        className={styles.Chevron}
                        style={{
                            transform: hovered ? (showFullSidebar ? "rotate(45deg)" : "rotate(-45deg)") : "rotate(0deg)",
                            marginTop: "-0.45em"
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ConversationsList