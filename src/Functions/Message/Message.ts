const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, setRightClick: Function) => {
    e.preventDefault()
    setRightClick(true)
}

const handleMouseDown = (setRightClick: Function, setLongPress: Function) => {
    const timer = setTimeout(() => {
        setRightClick(true)
        setLongPress(null)
    }, 500)
    setLongPress(timer as unknown as number)
}

const handleMouseUp = (longPress: number | null, setLongPress: Function) => {
    if (longPress) {
        clearTimeout(longPress)
        setLongPress(null)
    }
}

const downloadFile = (message: message) => {
    const arrayBuffer = new Blob([message.fileContent], { type: message.fileType })
    const fileUrl = URL.createObjectURL(arrayBuffer)
    const a = document.createElement("a")
    a.href = fileUrl
    a.download = message.fileName
    a.click()

    URL.revokeObjectURL(fileUrl)
}

export {
    handleContextMenu,
    handleMouseDown,
    handleMouseUp,
    downloadFile
}