import React from 'react'
import './SignUpPage.css'
import WhatsApp from '../../assets/whatsapp.svg'

const SingUpPage = () => {
  return (
    <div className='signUpPage'>
      <div className="signUp">
        <form method='post' action='/signup' className='formClass'>
        <h1 className='title'> <img src={WhatsApp} width={40} className='logo'/>  Inscription</h1>
          <input placeholder='Entrez un pseudo' className='input' type="text" maxLength={50} />
          <input placeholder='Entrez une adresse mail' className='input' type="text" maxLength={20} />
          <input placeholder='Entrez un mot de passe' className='input' type="password" minLength={5} />
          <input placeholder='Confirmez votre mot de passe' className='input' type="password" minLength={5} />
          <button className='button'>S'inscire sur WhastApp</button>
        </form>
      </div>
    </div>
  )
}

export default SingUpPage