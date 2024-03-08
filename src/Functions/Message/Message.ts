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

export {
    handleContextMenu,
    handleMouseDown,
    handleMouseUp
}