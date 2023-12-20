import React from 'react'
//@ts-ignore
import Phone from '../../assets/Phone.svg'
//@ts-ignore
import Video from '../../assets/Video.svg'
//@ts-ignore
import Search from '../../assets/Search.svg'
//@ts-ignore
import Expand from '../../assets/Expand.svg'

const ConversationsActions = () => {
    return (
        <div className="conversation-actions">
            <button className='conversation-bar-button'>
                <img src={Phone} alt="Phone" className='conversation-bar-icon' />
            </button>
            <button className='conversation-bar-button'>
                <img src={Video} alt="Video" className='conversation-bar-icon' />
            </button>
            <button className='conversation-bar-button'>
                <img src={Search} alt="Search" className='conversation-bar-icon' />
            </button>
            <button className='conversation-bar-button'>
                <img src={Expand} alt="Expand" className='conversation-bar-icon' />
            </button>
        </div>
    )
}

export default ConversationsActions
