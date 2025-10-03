import React, { useEffect, useState } from "react";
import { useWebSocket } from "../WebSocketProvider";
import { Chat, WSResponse } from "../Chat.Interfaces";

export function useFriendList(): { friendList: Chat[]; loading: boolean } {

    const { socket, sendMessage } = useWebSocket();

    const [loading, setLoading] = useState(false);

    const [friendList, setFriendList] = useState<Chat[]>([]);

    useEffect(() => {
        if (!socket) {
            return;
        }

        setLoading(true);
        sendMessage({ type: "get_friend_list" });

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
    }, [socket]);

    return { friendList, loading };
}