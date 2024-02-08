import React,{useEffect, useState} from 'react'
import './LoginPage.css'
// @ts-ignore
import WhatsApp from '../../assets/whatsapp.svg'
import { io } from 'socket.io-client'

const LoginPage = () => {
  const [socket, setSocket] = useState<any>(null)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:3001')

    newSocket.on('connect', () => {
      setSocket(newSocket)
    })

    newSocket.on('login', (data) => {
      if (data.validation) {
        localStorage.setItem('user', data.token);
        window.location.href = '/';
      } else {
        setError('Identifiant ou mot de passe incorrect');
      }
    });

    return () => {
      newSocket.close()
    }
  }, [])


  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (socket) {
      socket.emit('login', { email, password });
    }
  }

  return (
    <div className='LoginPage'>
      <div className="login">
        <form className='formClass'>
        <h1 className='title'> <img src={WhatsApp} width={40} className='logo'/>  Connexion</h1>
          <input onChange={(e)=>setEmail(e.target.value)} placeholder='Entrez votre adresse mail' className='input-login' type="text" maxLength={20} />
          <input onChange={(e)=>setPassword(e.target.value)} placeholder='Entrez votre mot de passe' className='input-login' type="password" minLength={5} />
          <button onClick={(e)=>handleSubmit(e)} className='button-login'>Se connecter à WhatsApp</button>
        </form>
        <p className='error'>{error}</p>
      </div>
    </div>
  )
}

export default LoginPage