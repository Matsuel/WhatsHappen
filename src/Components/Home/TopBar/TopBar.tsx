import React, { useState } from 'react'
import Conv1 from '../../../assets/conv1.svg'
import Online from '../../../assets/Online.svg'
import Offline from '../../../assets/Offline.svg'
import Phone from '../../../assets/Phone.svg'
import Video from '../../../assets/Video.svg'
import SearchConv from '../../../assets/SearchConv.svg'
import Expand from '../../../assets/Expand.svg'


const TopBar = ({ conversation: conv, handleSearchConv, showSearchConv }: TopBarProps) => {

    return (
        <div className="conversationtopbar">
            <div className="topbarleft">
                <img src={conv.conversationInfos.pic ? `data:image/jpeg;base64,${conv.conversationInfos.pic}` : Conv1} alt="conv1" className='topbarimage' />
                <div className="topbarnamestatut">
                    <h2 className="conversationname">
                        {conv.conversationInfos.name.charAt(0).toUpperCase() + conv.conversationInfos.name.slice(1)}
                    </h2>
                    <p className="conversationstatus">
                        <img src={conv.conversationInfos.status ? Online : Offline} alt="online" className='online' />
                        {conv.conversationInfos.status ? 'En ligne' : 'Hors ligne'}
                    </p>
                </div>
            </div>
            <div className="topbarright">
                <img src={Phone} alt="phoneconv" className='toprightbtn' />
                <img src={Video} alt="video" className='toprightbtn' />
                {showSearchConv ?
                    <input type="text" name="" id="" placeholder="Rechercher dans la conversation" className={`searchconv searchconvShow`} />
                    :
                    null
                }
                <img src={SearchConv} alt="searchconv" className='toprightbtn' onClick={handleSearchConv as any} />
                <img src={Expand} alt="expand" className='toprightbtn' />
            </div>
        </div>
    )
}

export default TopBar
