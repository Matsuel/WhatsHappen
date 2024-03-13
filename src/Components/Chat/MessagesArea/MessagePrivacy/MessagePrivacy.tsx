import React from 'react'
import Security from '../../../../assets/Security.svg'

import './MessagePrivacy.css'

const MessagePrivacy = () => {
    return (
        <div className="messageprivacy">
            <img src={Security} alt="security" className='security' />
            <p className='securitymessage'>Les messages sont chiffrés de bout en bout. Personne en dehors de ce chat, pas même WhatsApp, ne peut les lire ou les écouter, cliquez pour en savoir plus.</p>
        </div>
    )
}

export default MessagePrivacy
