
interface ConversationInfos {
    _id: string,
    users_id: string[],
    name: string,
    pic: string,
    status:boolean,
    pinnedBy: Array<string>,
    topRounded: boolean,
    bottomRounded: boolean,
    last_message_date: string,
    last_message_content: string,
    last_message_sender: string
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
    date: string,
    type: string,
    fileName: string,
    fileExtension: string,
    fileContent: Buffer | ArrayBuffer,
    fileType: string,
    reactions: Array<{ 
        user_id: string,
        reaction: string
    }>
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
    name: string,
    filesEmpty: boolean,
    setFilesEmpty: Function,
    files: FileInfos[],
    setFiles: Function,
}

interface TopBarProps {
    name: string,
    pic: string,
    status: boolean,
    handleSearchConv: Function,
    showSearchConv: boolean,
}

interface MessagesAreaProps {
    userId: string,
    scrollBottomRef: any,
    showSearchConv: boolean,
    messagesCount: number,
    messages: message[],
    filesEmpty: boolean,
    deleteMessage: Function,
    handleReaction: Function,
}

interface MessageProps {
    message: message,
    userId: string,
    i: number,
    scrollBottomRef: any,
    topRounded: boolean,
    bottomRounded: boolean,
    messagesCount: number,
    deleteMessage: Function,
    showSearchConv: boolean,
    handleReaction: Function,
}

interface MessageDateProps {
    message: message
}

interface FileInfos {
    name: string,
    content: ArrayBuffer,
    type: string,
    lastModified: number,
    extension: string
}

interface MessageFileProps {
    message: message,
    userId: string,
    i: number,
    scrollBottomRef: any,
    topRounded: boolean,
    bottomRounded: boolean,
    messagesCount: number,
    deleteMessage: Function,
    showSearchConv: boolean,
}

interface EmojiPickerProps {
    unified: string,
}


declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.gif' {
    const content: any;
    export default content;
}