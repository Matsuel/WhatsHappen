import React from 'react'
import './LoginPage.css'
import WhatsApp from '../../assets/whatsapp.svg'

const LoginPage = () => {
  return (
    <div className='LoginPage'>
      <div className="login">
        <form method='post' action='/login' className='formClass'>
        <h1 className='title'> <img src={WhatsApp} width={40} className='logo'/>  Connexion</h1>
          <input placeholder='Entrez votre adresse mail' className='input' type="text" maxLength={20} />
          <input placeholder='Entrez votre mot de passe' className='input' type="password" minLength={5} />
          <button className='button'>Se connecter à WhatsApp</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage