import { User } from "../Models/User.mjs";

export async function getConversationsInfos(conversations, userId, connectedUsers) {
    conversations = await Promise.all(conversations.map(async (conversation) => {
        let otherUserId = conversation.users_id.filter((id) => id !== userId)[0];
        let otherUser = await User.findById(otherUserId);
        let status = connectedUsers[otherUserId] ? true : false;
        return { ...conversation.toObject(), name: otherUser.username, pic: otherUser.pic, status };
    }))
    return conversations;
}


export function sortConversations(conversations, userId) {
    conversations = conversations.sort((a, b) => {
        // si a est épinglé et pas b
        if (a.pinnedBy.includes(userId) && !b.pinnedBy.includes(userId)) return -1;
        // si b est épinglé et pas a
        if (!a.pinnedBy.includes(userId) && b.pinnedBy.includes(userId)) return 1;
        // si a est plus récent que b
        if (a.last_message_date > b.last_message_date) return -1;
        // si b est plus récent que a
        if (a.last_message_date < b.last_message_date) return 1;
        return 0;
    })
    return conversations;
}