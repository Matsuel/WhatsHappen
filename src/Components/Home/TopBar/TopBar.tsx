import React from 'react'
import Conv1 from '../../../assets/conv1.svg'
import Online from '../../../assets/Online.svg'
import Phone from '../../../assets/Phone.svg'
import Video from '../../../assets/Video.svg'
import SearchConv from '../../../assets/SearchConv.svg'
import Expand from '../../../assets/Expand.svg'


const TopBar = ({ conversation: conv }: { conversation: conversation }) => {
    return (
        <div className="conversationtopbar">
            <div className="topbarleft">
                <img src={conv.conversationInfos.pic? `data:image/jpeg;base64,${conv.conversationInfos.pic}`: Conv1} alt="conv1" className='topbarimage' />
                <div className="topbarnamestatut">
                    <h2 className="conversationname">
                        {conv.conversationInfos.name.charAt(0).toUpperCase() + conv.conversationInfos.name.slice(1)}
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
    )
}

export default TopBar
