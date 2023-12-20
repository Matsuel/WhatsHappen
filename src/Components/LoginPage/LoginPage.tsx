import React,{useState} from 'react'
import './LoginPage.css'
// @ts-ignore
import WhatsApp from '../../assets/whatsapp.svg'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logged , setLogged] = useState(false);


  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', {email, password})
    .then(res => {
      if(res.data.validation){
        //REmplacer alert par une redirection
        setLogged(true);
      }else{
        //REmplacer alert par une redirection
        alert('Vous n\'êtes pas connecté')
      }
    })
  }

  return (
    <div className='LoginPage'>
      {logged && <Navigate to='/' />}
      <div className="login">
        <form className='formClass'>
        <h1 className='title'> <img src={WhatsApp} width={40} className='logo'/>  Connexion</h1>
          <input onChange={(e)=>setEmail(e.target.value)} placeholder='Entrez votre adresse mail' className='input' type="text" maxLength={20} />
          <input onChange={(e)=>setPassword(e.target.value)} placeholder='Entrez votre mot de passe' className='input' type="password" minLength={5} />
          <button onClick={(e)=>handleSubmit(e)} className='button'>Se connecter à WhatsApp</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage