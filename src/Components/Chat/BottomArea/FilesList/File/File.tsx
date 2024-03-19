import React from 'react'
import styles from './File.module.css'
import Trash from '../../../../../assets/Trash.svg'
import { FileIcon, defaultStyles } from 'react-file-icon'
import { deleteFile } from '../../../../../Functions/BottomBar/BottomBar'

interface FileProps {
    file: FileInfos,
    index: number,
    setFiles: Function,
    files: FileInfos[],
    setFilesEmpty: Function,
}
import Image from 'next/image'

const File = ({ file, index, setFiles, files, setFilesEmpty }: FileProps) => {
    return (
        <div key={index} className={styles.file}>
            <p className={styles.filename}>{file.name.length > 10 ? file.name.slice(0, 10) + '...' : file.name}</p>
            <div className={styles.fileicon}>
                <FileIcon extension={file.extension} {...defaultStyles[file.extension as keyof typeof defaultStyles]} />
            </div>
            <Image src={Trash} alt="trash" className={styles.trashfile} onClick={() => deleteFile(index, setFiles, files, setFilesEmpty)} />
        </div>
    )
}

export default File