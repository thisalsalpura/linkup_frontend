import React, { useEffect, useState } from "react";
import { useWebSocket } from "../WebSocketProvider";
import { Chat, WSResponse } from "../Chat.Interfaces";

export function useChatList(): { chatList: Chat[]; loading: boolean } {

    const { socket, sendMessage } = useWebSocket();

    const [loading, setLoading] = useState(false);

    const [chatList, setChatList] = useState<Chat[]>([]);

    useEffect(() => {
        if (!socket) {
            return;
        }

        setLoading(true);
        sendMessage({ type: "get_chat_list" });

        const onMessage = (event: MessageEvent) => {
            let response: WSResponse = JSON.parse(event.data);
            if (response.type === "friends_chat_list") {
                setChatList(response.data_set);
                setLoading(false);
            }
        };

        socket.addEventListener("message", onMessage);

        return () => {
            socket.removeEventListener("message", onMessage);
        }
    }, [socket]);

    return { chatList, loading };
}