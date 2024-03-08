const copyContentToClipboard = (content: string, setCopyDone: Function) => {
    setCopyDone(true)
    navigator.clipboard.writeText(content)
    setTimeout(() => {
        setCopyDone(false)
    }, 1500)
}

export {
    copyContentToClipboard
}