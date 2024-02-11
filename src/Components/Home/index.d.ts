
interface ConversationInfos {
    _id: string,
    users_id: string[],
    name: string
}

interface UserInfos {
    username: string,
    _id: string
}

interface message {
    _id: string,
    conversation_id: string,
    content: string,
    sender_id: string,
    date: string
}

interface conversation {
    conversationInfos: ConversationInfos,
    messages: message[]
}

interface User {
    userId: string,
    username: string,
    email: string,
    password: string
}

interface BottomBarProps {
    conversationActive: string,
    message: string,
    handleMessageChange: Function,
    sendMessage: Function,
    typingStatus: Object,
    conversation: conversation
}

interface MessagesAreaProps {
    conv: conversation,
    userId: string,
    scrollBottomRef: any
}

interface MessageProps {
    message: message,
    userId: string,
    conv: conversation,
    i: number,
    scrollBottomRef: any
}