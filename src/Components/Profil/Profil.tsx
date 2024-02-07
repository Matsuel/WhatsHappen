import React from 'react'
import './Profil.css'
// @ts-ignore
import BackArrow from '../../assets/BackArrow.svg'
// @ts-ignore
import Camera from '../../assets/Camera.svg'

const Profil = () => {

    return (
        <div className="profil">

            <div className="editaccount">
                <div className="navigationprofile">
                    <img src={BackArrow} alt="BackArrow" />
                    <h1 className='navigationtitle'>Profil</h1>
                </div>

                <div className="profileimage">
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Profile" className='profilepic' />
                    <div className="editpic" onClick={() => window.alert('Change Profile Picture')}>
                        <img src={Camera} alt="Camera" className='camera' />
                        Change Profile Picture
                    </div>

                </div>
            </div>
            

        </div>
    )
}

export default Profil
