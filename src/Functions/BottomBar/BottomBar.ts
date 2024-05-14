const onDrop = (acceptedFiles: File[], setFiles: Function, setFilesEmpty: Function) => {
    console.log(acceptedFiles)

    setFilesEmpty(false)
    acceptedFiles.forEach((file: File, index: number) => {
        const reader = new FileReader()
        // reader.readAsArrayBuffer(file)
        reader.readAsDataURL(file)
        reader.onload = () => {
            setFiles((prevFiles: FileInfos[]) => {
                const newFiles = [...prevFiles]
                newFiles[index] = {
                    name: file.name,
                    content: reader.result as string,
                    type: file.type,
                    lastModified: file.lastModified,
                    extension: file.name.split('.').pop() as string
                } 
                console.log(reader.result as ArrayBuffer)
                return newFiles
            })
        }
    })
}

const deleteFile = (index: number, setFiles: Function, files: FileInfos[], setFilesEmpty: Function) => {
    setFiles((prevFiles: FileInfos[]) => prevFiles.filter((_, i) => i !== index))
    files.length === 1 && setFilesEmpty(true)
}

const handleEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>, sendMessage: Function, conversationActive: string) => {
    if (e.key === 'Enter') {
        sendMessage(conversationActive)
    }
}

export {
    onDrop,
    deleteFile,
    handleEnterPressed
}