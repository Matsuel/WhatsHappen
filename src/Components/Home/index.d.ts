
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
    setMessage: Function,
    sendMessage: Function,
}