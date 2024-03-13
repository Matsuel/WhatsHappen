import React from 'react'
import "./ConversationInfos.css"
import DoubleChevrons from '../../../assets/DoubleChevrons.svg'

const ConversationInfos = ({ _id, name, last_message_sender, last_message_content, typingStatus, userId, handleConversationActive }: ConversationInfosProps) => {
    return (
        <div className="conversationinfos" onClick={() => handleConversationActive(_id)}>
            {/* Voir si j'ai pas besoin de créer un composant pour afficher le nom ailleurs */}
            <div>{name.charAt(0).toUpperCase() + name.slice(1)}</div>
            {/* Composant pour afficher le dernier message ou le statut de la conversation */}
            <div>
                {
                    typingStatus[_id as keyof typeof typingStatus] ?
                        "Est en train d'écrire" :
                        <>
                            {
                                last_message_sender !== userId &&
                                <img src={DoubleChevrons} alt="doublechevrons" />
                            }
                            {
                                last_message_content && last_message_content.length > 20 ?
                                    last_message_content.slice(0, 20) + "..." :
                                    last_message_content
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default ConversationInfos