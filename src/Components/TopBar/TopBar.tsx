import React from 'react'
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


const TopBar = ({ conversation: conv }: { conversation: conversation }) => {
    return (
        <div className="conversationtopbar">
            <div className="topbarleft">
                <img src={Conv1} alt="conv1" className='conv1' />
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
