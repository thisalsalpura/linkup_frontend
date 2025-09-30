export interface User {
    id: number;
    fname: string;
    lname: string;
    countryCode: string;
    mobile: string;
    profileImage?: string;
}

export interface Chat {
    friendId: number;
    friendName: string;
    lastMessage: string;
    lastMessageTimeStamp: string;
    unreadMessageCount: string;
    profileImage: string;
    from: User;
    to: User;
    createdAt: string;
    updatedAt: string;
    status: string;
    message: string;
}

export interface WSRequest {
    type: string;
    fromUserId?: number;
    toUserId?: number;
    message?: string;
}

export interface WSResponse {
    type: string;
    payload: any;
}