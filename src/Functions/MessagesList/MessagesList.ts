function isBottomRounded(nextMessage: message|null, sender_id: string): boolean {
    if (nextMessage) {
        return nextMessage.sender_id !== sender_id;
    }
    return true;
}

function isTopRounded(previousMessage: message|null, sender_id: string): boolean {
    if (previousMessage) {
        return previousMessage.sender_id !== sender_id;
    }
    return true;
}

export { isBottomRounded, isTopRounded }