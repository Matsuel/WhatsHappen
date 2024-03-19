
type ConversationInfos = {
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

type UserInfos = {
    pic: string,
    username: string,
    _id: string,
}

type message = {
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

type conversation = {
    conversationInfos: ConversationInfos,
    messages: message[]
}

type User = {
    pic:string,
    userId: string,
    username: string,
    email: string,
    password: string
}

type FileInfos = {
    name: string,
    content: string | ArrayBuffer | null,
    type: string,
    lastModified: number,
    extension: string
}

type EmojiPickerProps = {
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