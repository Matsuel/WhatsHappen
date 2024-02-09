import React from 'react'
// @ts-ignore
import PhoneConv from '../../assets/PhoneConv.svg'

const NoConvActive = () => {
    return (
        <div className="noconvactive">
            <img src={PhoneConv} alt="phoneconv" className='phoneconv' />
            <h1 className="no-conv-title-active">Gardez votre téléphone connecté</h1>
            <p className="no-conv-subtitle-active">Whatsapp se connecte à votre téléphone pour synchroniser les messages. Pour réduire l’utilisation des données. connectez votre téléphone au Wi-Fi.</p>
        </div>
    )
}

export default NoConvActive
