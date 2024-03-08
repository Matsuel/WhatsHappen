function isBottomRounded(nextMessage: message|null, sender_id: string): boolean {
    return nextMessage ? nextMessage.sender_id === sender_id : true
}

function isTopRounded(previousMessage: message|null, sender_id: string): boolean {
    return previousMessage ? previousMessage.sender_id === sender_id : true
}

export { isBottomRounded, isTopRounded }