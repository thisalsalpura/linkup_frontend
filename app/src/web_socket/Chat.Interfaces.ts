export interface User {
    id: number;
    fname: string;
    lname: string;
    countryCode: string;
    mobile: string;
    profileImage?: string;
    status: string;
}

export interface Chat {
    friendId: number;
    friendFname: string;
    friendLname: string;
    lastMessage: string;
    lastMessageTimeStamp: string;
    unreadMessageCount: number;
    profileImage: string;
    from: User;
    to: User;
    message: string;
    createdAt: string;
    updatedAt: string;
    status: string;
}

export interface WSRequest {
    type: string;
    fromUserId?: number;
    toUserId?: number;
    message?: string;
}

export interface WSResponse {
    type: string;
    data_set: any;
    status: boolean;
    message: string;
}