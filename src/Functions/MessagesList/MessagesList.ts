function isBottomRounded(nextMessage: message|null, sender_id: string, messageDate : string): boolean {
    if (nextMessage) {
        return nextMessage.sender_id !== sender_id || new Date(nextMessage.date).toDateString() !== new Date(messageDate).toDateString();
    }
    return true;
}

function isTopRounded(previousMessage: message|null, sender_id: string, messageDate : string): boolean {
    if (previousMessage) {
        return previousMessage.sender_id !== sender_id || new Date(previousMessage.date).toDateString() !== new Date(messageDate).toDateString();
    }
    return true;
}

export { isBottomRounded, isTopRounded }