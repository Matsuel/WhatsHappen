import React from 'react'
import './File.css'
import Trash from '../../../../../assets/Trash.svg'
import { FileIcon, defaultStyles } from 'react-file-icon'
import { deleteFile } from '../../../../../Functions/BottomBar/BottomBar'

const File = ({ file, index, setFiles, files, setFilesEmpty }: FileProps) => {
    return (
        <div key={index} className="file">
            <p className='filename'>{file.name.length > 10 ? file.name.slice(0, 10) + '...' : file.name}</p>
            <div className="fileicon">
                <FileIcon extension={file.extension} {...defaultStyles[file.extension as keyof typeof defaultStyles]} />
            </div>
            <img src={Trash} alt="trash" className='trashfile' onClick={() => deleteFile(index, setFiles, files, setFilesEmpty)} />
        </div>
    )
}

export default File