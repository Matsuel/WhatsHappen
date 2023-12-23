import React,{useState} from 'react'
//@ts-ignore
import Profile from '../../assets/Profile.svg'
//@ts-ignore
import Archive from '../../assets/Archive.svg'
//@ts-ignore
import Read from '../../assets/Read.svg'
//@ts-ignore
import Circle from '../../assets/Circle.svg'
//@ts-ignore
import Expand from '../../assets/Expand.svg'
//@ts-ignore
import Conv1 from '../../assets/conv1.svg'
// @ts-ignore
import NewConv from '../../assets/NewConv.svg'
import Cookies from 'js-cookie';

interface conversation {
    id: number,
    name: string,
    avatar: string,
    lastMessage: string,
    lastMessageHour: string,
    isLastMessageReceivedRead: boolean,
    isLastMessageSendRead: boolean,
    isArchived: boolean,
    isPin: boolean,
    messageType: string,
    messages: message[],
    numberOfUnreadMessages: number
}

interface message {
    message: string,
    hour: string,
    sender: string,
    isRead: boolean,
    type: string
}


const ConvBar = ({ conversationList, convActive, handleConvActive }: { conversationList: any, convActive: number, handleConvActive: any }) => {
    const [search, setSearch] = useState('')
    const [placeholderText, setPlaceholderText] = useState('Rechercher une conversation');
    const [tabActive, setTabActive] = useState(0);
    const [countArchived, setCountArchived] = useState(0)

    const handleChange = (e: any) => {
        setSearch(e.target.value)
    }

    const handlePlaceholder = () => {
        if (placeholderText !== '') {
            setPlaceholderText('')
        } else {
            setPlaceholderText('Rechercher une conversation')
        }
    }

    const handleTabActive = (tab: number) => {
        setTabActive(tab)
    }

    const logout = () => {
        Cookies.remove('user');
        window.location.href = '/login';
    }

    return (
        <div className="conversation">
            <div className="conv-bar">
                <div className="avatar-title-wrapper-conv">
                    <div className="avatar-conv-bar">
                        <img src={Profile} alt="Avatar" className="avatar" />
                    </div>
                    <div className="avatar-conv-bar">
                        <img src={Circle} alt="Circle" className='avatar' />
                    </div>
                </div>
                <div onClick={()=>logout()} className="avatar-dots-wrapper-conv">
                    <img src={Expand} alt="Add" className="avatar" />
                </div>
            </div>
            <div className="search-bar-conv">
                <input onChange={(e: any) => handleChange(e)} type="text" placeholder={placeholderText} onClick={handlePlaceholder} onBlur={handlePlaceholder} id='search-input-conv' className="search-input-conv" />
            </div>
            <div className="type-conv">
                <h1 key={0} className={`type-conv-title type-conv-title1 ${tabActive === 0 ? "type-conv-active" : ""}`} onClick={() => handleTabActive(0)} >Favorites</h1>
                <h1 key={1} className={`type-conv-title ${tabActive === 1 ? "type-conv-active" : ""}`} onClick={() => handleTabActive(1)}>Amis</h1>
                <h1 key={2} className={`type-conv-title type-conv-title3 ${tabActive === 2 ? "type-conv-active" : ""}`} onClick={() => handleTabActive(2)}>Groupes</h1>

            </div>
            <div className="archived-conv">
                <img src={Archive} alt="Archive" className='archive-logo' />
                <h1 className='archive-title'>Archivées</h1>
                <h1 className='archive-count'>{countArchived}</h1>
            </div>
            <div className="conv-list">
                {conversationList.conversations.length === 0 ? (
                    <div className="no-conv">
                        Aucune converstation pour le moment appuyer sur le bouton + pour en créer une
                    </div>
                ) : (
                    conversationList.conversations.map((conversation: conversation) => (
                        <><div className="conv-wrapper">
                            <div className={`conv ${conversation.id === convActive ? "conv-active" : ""}`} key={conversation.id} onClick={() => handleConvActive(conversation.id)}>
                                <div className="avatar-conv">
                                    <img src={Conv1} alt="Avatar" className="conv-logo" />
                                </div>
                                <div className="conv-details">
                                    <div className="conv-top-details">
                                        <h1 className="conv-name">{conversation.name}</h1>
                                        {conversation.isLastMessageReceivedRead ? (
                                            <h1 className="conv-hour">{conversation.lastMessageHour}</h1>
                                        ) : (
                                            <h1 className="conv-hour-unread">{conversation.lastMessageHour}</h1>
                                        )}
                                    </div>
                                    <div className="conv-bottom-details">
                                        {conversation.isLastMessageSendRead ? (
                                            <div className="lastMessageUnread">
                                                <img src={Read} alt="DoubleTick" className="doubleTick" />
                                                <h1 className="lastMessage">{conversation.lastMessage}</h1>
                                            </div>
                                        ) : (
                                            <div className="lastMessageRead">
                                                <h1 className="lastMessage message-read">{conversation.lastMessage}</h1>
                                            </div>

                                        )}

                                        {conversation.numberOfUnreadMessages > 0 ? (
                                            <h1 className="numberOfUnreadMessages">
                                                {conversation.numberOfUnreadMessages > 5 ? (
                                                    "5+"
                                                ) : (
                                                    conversation.numberOfUnreadMessages
                                                )}
                                            </h1>
                                        ) : (
                                            <div className="">

                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </>
                    ))
                )}
                <button className='newConv-Button'>
                    <img src={NewConv} alt="NewConv" className="newConv" />
                </button>
            </div>
        </div>
    )
}

export default ConvBar
