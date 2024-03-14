import React,{useEffect, useState} from 'react'
import styles from '@/styles/Login.module.css'
import WhatsApp from '@/assets/whatsapp.svg'
import { io } from 'socket.io-client'
import Image from 'next/image'

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
    <div className={styles.LoginPage}>
      <div className={styles.login}>
        <form className={styles.formClass}>
        <h1 className={styles.title}> <Image alt='logo' src={WhatsApp} width={40} className='logo'/>  Connexion</h1>
          <input onChange={(e)=>setEmail(e.target.value)} placeholder='Entrez votre adresse mail' className={styles.inputlogin} type="text" maxLength={20} />
          <input onChange={(e)=>setPassword(e.target.value)} placeholder='Entrez votre mot de passe' className={styles.inputlogin} type="password" minLength={5} />
          <button onClick={(e)=>handleSubmit(e)} className={styles.buttonlogin}>Se connecter à WhatsApp</button>
        </form>
        <p className={styles.error}>{error}</p>
      </div>
    </div>
  )
}

export default LoginPage