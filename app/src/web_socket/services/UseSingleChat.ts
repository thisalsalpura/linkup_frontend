import React, { useEffect, useState } from "react";
import { useWebSocket } from "../WebSocketProvider";
import { Chat, WSResponse } from "../Chat.Interfaces";

export function useSingleChat(friendId: number) {

    const { socket, sendMessage } = useWebSocket();

    const [messages, setMessages] = useState<Chat[]>([]);

    useEffect(() => {
        if (!socket) {
            return;
        }

        sendMessage({ type: "get_single_chat", friendId });

        const onMessage = (event: MessageEvent) => {
            let response: WSResponse = JSON.parse(event.data);
            if (response.type === "single_chat") {
                setMessages(response.data_set);
            }

            if (response.type === "new_message" && response.data_set.to.id === friendId) {
                setMessages((prev) => [...prev, response.data_set]);
            }
        };

        socket.addEventListener("message", onMessage);

        return () => {
            socket.removeEventListener("message", onMessage);
        }
    }, [socket, friendId]);

    return messages;
}