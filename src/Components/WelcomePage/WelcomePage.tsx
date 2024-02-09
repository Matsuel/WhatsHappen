import React from 'react'
import './WelcomePage.css'
// @ts-ignore
import WhatsappGif from '../../assets/whatsapp.gif'

const WelcomePage = () => {
  return (
    <div className='welcomePage'>
      <div className="titleDiv">
        <h1 className='title'>Bienvenue sur WhatsApp</h1>
        <img src={WhatsappGif} alt="WhatsappGif" className='gif' />
        <h2 className='subTitle'>Un moyen simple, fiable et confidentiel d'utiliser WhastApp sur votre ordinateur</h2>
        <button className='button'>Démarrer</button>
        <h2 className='version'>v0.0.0.1</h2>
      </div>
    </div>
  )
}

export default WelcomePage