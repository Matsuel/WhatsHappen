import React from 'react'

const NoResult = ({ content }: { content: string }) => {
    return (
        <div className="conversation">
            <div className="convimagestatus">
                <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Abby" alt="conv1" className='conversationimage' />
            </div>
            <div className="conversationinfos">
                <div>{content}</div>
            </div>
        </div>
    )
}

export default NoResult