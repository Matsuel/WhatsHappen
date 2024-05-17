import React, { useEffect, useState } from 'react'
import styles from '@/styles/Login.module.css'
import WhatsApp from '@/assets/whatsapp.svg'
import { io } from 'socket.io-client'
import Image from 'next/image'
import Eye from '@/assets/Eye.svg'
import EyeSlash from '@/assets/EyeSlash.svg'
import Trash from '@/assets/Trash.svg'
import JoinFile from '@/assets/JoinFile.svg'
import CustomHead from '@/Components/CustomHead/CustomHead'

const LoginPage = () => {
  const [socket, setSocket] = useState<any>(null)
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const [passwordShown, setPasswordShown] = useState<boolean[]>([false, false, false]);
  const [login, setLogin] = useState<boolean>(true);

  const [fileName, setFileName] = useState<string>('');

  const togglePasswordVisiblity = (index: number) => {
    const updatedPasswordShown = passwordShown
    updatedPasswordShown[index] = !updatedPasswordShown[index]
    setPasswordShown([...updatedPasswordShown])
  };

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

    newSocket.on('register', (data) => {
      if (data.created) {
        localStorage.setItem('user', data.token);
        window.location.href = '/';
      } else {
        console.log('Échec de la connexion:', data.error);
        setError('Identifiant déjà utilisé ou mots de passe non égaux');
      }
    });

    return () => {
      newSocket.close()
    }
  }, [])


  const handleSubmitLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (socket) {
      socket.emit('login', { email, password });
    }
  }

  const handleSubmitRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Les mots de passe ne sont pas égaux')
    } else {
      if (socket) {
        socket.emit('register', { pseudo, email, password, selectedFile });
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file);
    setFileName(file?.name || '');
  }

  const deleteFile = () => {
    setFileName('');
    setSelectedFile(null);
  }

  return (
    <div className={styles.LoginPage}>

      <CustomHead title="iMessage - Login" />

      <div className={styles.form}>
        <form className={styles.part}>
          {!login ? (
            <>
              <Image alt='whatsapp' src={WhatsApp} width={50} height={50} className={styles.whatsappLogo} />
              <h2 className={styles.title}>S'inscrire sur iMessages</h2>
              <div className={styles.fileWrapper}>
                <p className={selectedFile ? styles.fileInputText : styles.fileInputTextNoFile}>
                  {fileName.charAt(0).toUpperCase() + fileName.slice(1).toLowerCase() || 'Choisissez un fichier'}
                </p>
                {fileName ? (<Image alt='trash' src={Trash} width={20} onClick={deleteFile} className={styles.eye} />) : (<label htmlFor="fileInput" className={styles.eye}> <Image alt='trash' src={JoinFile} width={20} /> </label>)}
                <input onChange={handleFileChange} className={styles.inputfile} type="file" id="fileInput" />
              </div>
              <input onChange={(e) => setPseudo(e.target.value)} placeholder='Entrez votre pseudo' className={styles.inputlogin} type="text" maxLength={20} />
              <input onChange={(e) => setEmail(e.target.value)} placeholder='Entrez votre adresse mail' className={styles.inputlogin} type="text" maxLength={20} />
              <div className={styles.passwordWrapper}>
                <input onChange={(e) => setPassword(e.target.value)} placeholder='Entrez votre mot de passe' className={styles.inputpassword} type={passwordShown[0] ? "text" : "password"} minLength={5} />
                <Image alt='eye' src={passwordShown[0] ? EyeSlash : Eye} width={20} onClick={() => togglePasswordVisiblity(0)} className={styles.eye} />
              </div>
              <div className={styles.passwordWrapper}>
                <input onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirmez votre mot de passe' className={styles.inputpassword} type={passwordShown[1] ? "text" : "password"} minLength={5} />
                <Image alt='eye' src={passwordShown[1] ? EyeSlash : Eye} width={20} onClick={() => togglePasswordVisiblity(1)} className={styles.eye} />
              </div>
              <button onClick={(e) => handleSubmitRegister(e)} className={styles.buttonlogin}>S'inscrire sur iMessages</button>
            </>
          ) : (
            <button onClick={() => setLogin(false)} className={styles.buttonlogin}>S'inscrire sur iMessages</button>
          )}

        </form>


        <form className={styles.part}>
          {login ? (
            <>
              <Image alt='whatsapp' src={WhatsApp} width={50} height={50} className={styles.whatsappLogo} />
              <h2 className={styles.title}>Se connecter à iMessages</h2>
              <input onChange={(e) => setEmail(e.target.value)} placeholder='Entrez votre adresse mail' className={styles.inputlogin} type="text" maxLength={20} />
              <div className={styles.passwordWrapper}>
                <input onChange={(e) => setPassword(e.target.value)} placeholder='Entrez votre mot de passe' className={styles.inputpassword} type={passwordShown[2] ? "text" : "password"} minLength={5} />
                <Image alt='eye' src={passwordShown[2] ? EyeSlash : Eye} width={20} onClick={() => togglePasswordVisiblity(2)} className={styles.eye} />
              </div>
              <button onClick={(e) => handleSubmitLogin(e)} className={styles.buttonlogin}>Se connecter à iMessages</button>
            </>
          ) : (
            <button onClick={() => setLogin(true)} className={styles.buttonlogin}>Se connecter à iMessages</button>
          )}
        </form>



      </div>
    </div>
  )
}

export default LoginPage