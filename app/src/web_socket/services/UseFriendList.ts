import React, { useCallback, useEffect, useState } from "react";
import { useWebSocket } from "../WebSocketProvider";
import { Chat, WSResponse } from "../Chat.Interfaces";

export function useFriendList(): { friendList: Chat[]; setFriendList: React.Dispatch<React.SetStateAction<Chat[]>>; loading: boolean; fetchFriendList: () => void; } {

    const { socket, sendMessage } = useWebSocket();

    const [loading, setLoading] = useState(false);

    const [friendList, setFriendList] = useState<Chat[]>([]);

    const fetchFriendList = useCallback(() => {
        if (!socket) return;

        setLoading(true);
        sendMessage({ type: "get_friend_list" });
    }, [socket, sendMessage]);

    useEffect(() => {
        if (!socket) return;

        fetchFriendList();

        const onMessage = (event: MessageEvent) => {
            let response: WSResponse = JSON.parse(event.data);
            if (response.type === "friends_list") {
                setFriendList(response.data_set);
                setLoading(false);
            }
        };

        socket.addEventListener("message", onMessage);

        return () => {
            socket.removeEventListener("message", onMessage);
        }
    }, [socket, fetchFriendList]);

    return { friendList, setFriendList, loading, fetchFriendList };
}