import React from 'react'
import styles from './FilesList.module.css'
import Trash from '../../assets/Trash.svg'
import File from './File/File'

const FilesList = ({ files, setFiles, setFilesEmpty }: FilesListProps) => {
  return (
    <>
    {files.length > 0 ? (
        <div className={styles.fileslist}>
            {
                files.map((file, index) => {
                    return (
                        <File key={index} file={file} index={index} setFiles={setFiles} files={files} setFilesEmpty={setFilesEmpty} />
                    )
                })
            }
        </div>
    ) : null}
    </>
  )
}

export default FilesList