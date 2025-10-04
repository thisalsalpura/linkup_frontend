import React, { useCallback, useEffect, useState } from "react";
import { useWebSocket } from "../WebSocketProvider";
import { Chat, WSResponse } from "../Chat.Interfaces";

export function useChatList(): { chatList: Chat[]; loading: boolean, fetchChatList: () => void; } {

    const { socket, sendMessage } = useWebSocket();

    const [loading, setLoading] = useState(false);

    const [chatList, setChatList] = useState<Chat[]>([]);

    const fetchChatList = useCallback(() => {
        if (!socket) return;

        setLoading(true);
        sendMessage({ type: "get_chat_list" });
    }, [socket, sendMessage]);

    useEffect(() => {
        if (!socket) return;

        fetchChatList();

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
    }, [socket, fetchChatList]);

    return { chatList, loading, fetchChatList };
}