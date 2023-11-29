import React, {useState} from 'react'
import './Home.css'
//@ts-ignore
import Add from '../../assets/add.svg'
//@ts-ignore
import Profile from '../../assets/Profile.svg'
//@ts-ignore
import Dots from '../../assets/Dots.svg'

const Home = () => {
    const [search, setSearch] = useState('')

    const handleChange = (e: any) => {
        setSearch(e.target.value)
        console.log(search)
    }

    return (
        <div className='home-wrapper'>
            <div className="conversation">
                <div className="conv-bar">
                    <div className="avatar-title-wrapper-conv">
                        <div className="avatar-conv-bar">
                            <img src={Profile} alt="Avatar" className="avatar" />
                        </div>
                        <h1 className="title-conv-bar">
                            Conversations
                        </h1>
                    </div>
                    <div className="avatar-dots-wrapper-conv">
                        <img src={Add} alt="Add" className="avatar" />
                        <img src={Dots} alt="Dots" className="avatar" />
                    </div>
                </div>
            </div>
            <div className="converstion-active">
            </div>
        </div>
    )
}

export default Home