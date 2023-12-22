import React, { useState } from 'react'
import './Register.css'
// @ts-ignore
import WhatsApp from '../../assets/whatsapp.svg'
import axios from 'axios'
import bcrypt from 'bcryptjs'

const Register = () => {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      axios.post('http://localhost:3001/register', { pseudo, email, hashedPassword })
        .then(res => {
          if (res.data.created) {
            //REmplacer alert par une redirection
            alert('Inscription réussie')
          } else {
            //REmplacer alert par une redirection
            alert('Identifiant déjà utilisé ou mots de passe non égaux')
          }
        })
    }
  }


  return (

    <div className='signUpPage'>
      <div className="signUp">
        <form className='formClass'>
          <h1 className='title'> <img src={WhatsApp} width={40} className='logo' />  Inscription</h1>
          <input onChange={(e) => setPseudo(e.target.value)} placeholder='Entrez un pseudo' className='input' type="text" maxLength={50} />
          <input onChange={(e) => setEmail(e.target.value)} placeholder='Entrez une adresse mail' className='input' type="text" maxLength={20} />
          <input onChange={(e) => setPassword(e.target.value)} placeholder='Entrez un mot de passe' className='input' type="password" minLength={5} />
          <input onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirmez votre mot de passe' className='input' type="password" minLength={5} />
          <button onClick={(e)=> handleSubmit(e)} className='button'>S'inscire sur WhastApp</button>
        </form>
      </div>
    </div>
  )
}

export default Register