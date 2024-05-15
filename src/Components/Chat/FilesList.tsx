import React from 'react'
import styles from './style.module.scss'
import Bottombar from './InputBar'

interface FilesListProps {
    conversationActive: string,
    name: string,
}

const FilesList = ({
    conversationActive,
    name,
}: FilesListProps) => {

    return (
        <div className={styles.bottomArea}>

            <Bottombar
                conversationActive={conversationActive}
            />
        </div>
    )
}

export default FilesList
