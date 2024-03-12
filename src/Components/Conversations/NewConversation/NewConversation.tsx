import React from 'react'
import './NewConversation.css'
import NewConv from '../../../assets/NewConv.svg'

const NewConversation = ({ canRotate, handleNewConv }: { canRotate: boolean, handleNewConv: Function }) => {
    return (
        <div className={`newconv-div ${canRotate ? 'newConv-rotate' : ''}`} onClick={() => handleNewConv()}>
            <img src={NewConv} alt="newconv" className='newConv' />
        </div>
    )
}

export default NewConversation