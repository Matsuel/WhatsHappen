import React from 'react'
import './FilesList.css'
import Trash from '../../assets/Trash.svg'
import { FileIcon, defaultStyles } from 'react-file-icon'
import { deleteFile } from '../../../../Functions/BottomBar/BottomBar'
import File from './File/File'

const FilesList = ({ files, setFiles, setFilesEmpty }: FilesListProps) => {
  return (
    <>
    {files.length > 0 ? (
        <div className="fileslist">
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