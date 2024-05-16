import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import NoResult from '../NoResult/NoResult'
import Conversation from '@/Components/Conversation/Conversation'
import Searchbar from './Searchbar'
import { decodeToken } from 'react-jwt'
import { socket } from '@/pages/_app'
import PinnedConversations from '@/Components/PinnedConversations/PinnedConversations'
import Header from './Header'
import EditModal from './EditModal'

interface SidebarProps {
    conversationActive: string,
    setConversationActive: Function,
    handleNewConv: Function,
    btnRef: any
}

const Sidebar = ({
    conversationActive,
    setConversationActive,
    handleNewConv,
    btnRef
}: SidebarProps) => {

    const [editConversation, setEditConversation] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [conversations, setConversations] = useState<ConversationInfos[]>([])
    const conversationsNoResult: string = "Aucune conversation trouvée"
    const [hasMatchingConversations, setHasMatchingConversations] = useState<boolean>(true)


    const handleEditConv = () => {
        setEditConversation(!editConversation)
    }

    const handleEditModal = () => {
        setEdit(!edit)
    }

    const handleConversationActive = (conversationId: string) => {
        if (conversationId === conversationActive) {
            setConversationActive('')
            return
        }
        setConversationActive(conversationId)
        socket.emit('conversationmessages', { cookies, conversation_id: conversationId })
    }

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
                btnRef={btnRef}
                handleEditModal={handleEditModal}
            />

            <EditModal 
                editConversation={editConversation}
                setEditConversation={setEditConversation}
                edit={edit}
                setEdit={setEdit}
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
                        setConversationActive={setConversationActive}
                        search={search}
                    />

                    {notPinnedConversations.map((conversation) => {

                        const classActive = conversation._id === conversationActive

                        const noConvActiveClass = conversationActive === ""

                        return (
                            conversation.name.toLowerCase().includes(search.toLowerCase()) && (
                                <Conversation
                                    conversation={conversation}
                                    userId={userId}
                                    classActive={classActive}
                                    noConvActiveClass={noConvActiveClass}
                                    handleConversationActive={handleConversationActive}
                                    editConversation={editConversation}
                                />
                            )
                        )
                    })}
                    {
                        !hasMatchingConversations &&
                        <NoResult
                            content={conversationsNoResult}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar