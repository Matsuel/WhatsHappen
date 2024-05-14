import React from 'react'
import styles from './style.module.css'
import Bottombar from './InputBar'
import File from '../File/File'

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
