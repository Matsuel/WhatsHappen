
interface ConversationInfos {
    _id: string,
    users_id: string[],
    name: string,
    pic: string,
    status:boolean,
    pinnedBy: Array<string>,
    topRounded: boolean,
    bottomRounded: boolean,
}

interface UserInfos {
    pic: string,
    username: string,
    _id: string,
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
    pic:string,
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
    name: string
}

interface TopBarProps {
    name: string,
    pic: string,
    status: boolean,
    handleSearchConv: Function,
    showSearchConv: boolean
}

interface MessagesAreaProps {
    userId: string,
    scrollBottomRef: any,
    showSearchConv: boolean,
    messagesCount: number,
    messages: message[]
}

interface MessageProps {
    message: message,
    userId: string,
    i: number,
    scrollBottomRef: any,
    topRounded: boolean,
    bottomRounded: boolean,
    messagesCount: number,
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.gif' {
    const content: any;
    export default content;
}