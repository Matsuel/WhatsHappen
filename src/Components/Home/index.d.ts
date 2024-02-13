
interface ConversationInfos {
    _id: string,
    users_id: string[],
    name: string,
    pic: string,
    status:boolean,
    pinnedBy: Array<string>,
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
    conversation: conversation,
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
    conv: conversation,
    userId: string,
    scrollBottomRef: any,
    showSearchConv: boolean
}

interface MessageProps {
    message: message,
    userId: string,
    conv: conversation,
    i: number,
    scrollBottomRef: any,
    topRounded: boolean,
    bottomRounded: boolean
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.gif' {
    const content: any;
    export default content;
}