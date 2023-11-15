import React, {useState} from 'react'
import './SignUpPage.css'
import WhatsApp from '../../assets/whatsapp.svg'

const SingUpPage = () => {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');    

  return (
    <div className='signUpPage'>
      <div className="signUp">
        <form method='post' action='/signup' className='formClass'>
        <h1 className='title'> <img src={WhatsApp} width={40} className='logo'/>  Inscription</h1>
          <input onChange={(e)=>setPseudo(e.target.value)} placeholder='Entrez un pseudo' className='input' type="text" maxLength={50} />
          <input onChange={(e)=>setEmail(e.target.value)} placeholder='Entrez une adresse mail' className='input' type="text" maxLength={20} />
          <input onChange={(e)=>setPassword(e.target.value)} placeholder='Entrez un mot de passe' className='input' type="password" minLength={5} />
          <input onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirmez votre mot de passe' className='input' type="password" minLength={5} />
          <button className='button'>S'inscire sur WhastApp</button>
        </form>
      </div>
    </div>
  )
}

export default SingUpPage