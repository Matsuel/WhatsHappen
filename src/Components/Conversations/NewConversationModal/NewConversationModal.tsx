import React, { ChangeEventHandler } from 'react'
import './NewConversationModal.css'
import Conv1 from '../../../assets/conv1.svg'

const NewConversationModal = ({ showNewConv, users, searchUsers, handleSearchUsers, createConversation }: { showNewConv: boolean, users: UserInfos[], searchUsers: string, handleSearchUsers: ChangeEventHandler, createConversation: Function }) => {
  return (
    <>
    {showNewConv ? (
        <div className="newconvmodal">
            <input type="text" placeholder='Nom de votre interlocuteur' className='newconvinput' onChange={handleSearchUsers} />
            {users.length > 0 && searchUsers !== "" ? (
                users.map((user) => {
                    return (
                        user.username.toLowerCase().includes(searchUsers.toLowerCase()) ? (
                            // Composant userDatas
                            <div className="newconvuser" key={user._id} onClick={() => createConversation(user._id)}>
                                <img src={user.pic !== "" ? `data:image/jpeg;base64,${user.pic}` : Conv1} className='userpic' />
                                <p>{user.username}</p>
                            </div>
                        ) : null
                    )
                })
                // Renvoyer un composant NoResult
            ) : null}
        </div>
    ) : null}
    </>
  )
}

export default NewConversationModal