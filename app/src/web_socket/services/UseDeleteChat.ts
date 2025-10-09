import React from "react";
import { useWebSocket } from "../WebSocketProvider";

export function useDeleteChat() {
    const { sendMessage } = useWebSocket();

    const sendChat = (chatId: number) => {
        sendMessage({
            type: "delete_message",
            chatId
        });
    };

    return sendChat;
}