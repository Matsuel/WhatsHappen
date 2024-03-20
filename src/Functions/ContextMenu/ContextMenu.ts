const copyContentToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
}

export {
    copyContentToClipboard
}