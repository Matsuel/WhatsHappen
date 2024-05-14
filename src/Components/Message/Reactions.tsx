import React from 'react'
import styles from './style.module.scss'
import { Emoji } from 'emoji-picker-react'

interface ReactionsProps {
    reactions: Array<{ user_id: string, reaction: string }>,
    handleReaction: Function,
    id: string
}

const Reactions = ({
    reactions,
    handleReaction,
    id
}: ReactionsProps) => {

    
    

    return (
        <>
            {
                reactions && reactions.length > 0 &&

                <div className={styles.reactions}>

                    {reactions.map((reaction, i) => {
                        return (
                            <div className={styles.reaction} key={i} onClick={() => { handleReaction(id, reaction.reaction) }}>
                                <Emoji unified={reaction.reaction} size={13} />
                            </div>
                        )
                    })}

                    <div className={styles.reaction}>
                        <h4 className={styles.reactionCount}>
                            {reactions.length}
                        </h4>
                    </div>
                </div>
            }
        </>

    )
}

export default Reactions