import React, { useEffect, useState } from "react";
import { useWebSocket } from "../WebSocketProvider";
import { Chat, WSResponse } from "../Chat.Interfaces";

export function useSingleChat(friendId: number): { messages: Chat[]; loading: boolean; } {

    const { socket, sendMessage } = useWebSocket();

    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState<Chat[]>([]);

    useEffect(() => {
        if (!socket) return;

        setLoading(true);
        sendMessage({ type: "get_single_chat", friendId });

        const onMessage = (event: MessageEvent) => {
            let response: WSResponse = JSON.parse(event.data);
            if (response.type === "single_chat") {
                setMessages(response.data_set ? response.data_set : []);
                setLoading(false);
            }

            if (response.type === "new_message" && response.data_set.to.id === friendId) {
                if (Array.isArray(response.data_set)) {
                    setMessages((prev) => [...prev, ...response.data_set]);
                } else {
                    setMessages((prev) => [...prev, response.data_set]);
                }
            }

            if (response.type === "delete_message") {
                const deletedChat: Chat = response.data_set;
                setMessages((prev) => prev.filter(msg => msg.id !== deletedChat.id));
            }
        };

        socket.addEventListener("message", onMessage);

        return () => {
            socket.removeEventListener("message", onMessage);
        }
    }, [socket, friendId]);

    return { messages, loading };
}