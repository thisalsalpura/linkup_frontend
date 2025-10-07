import React from "react";
import { useWebSocket } from "../WebSocketProvider";

export function useUpdateChatStatus() {
    const { sendMessage } = useWebSocket();

    const sendChat = () => {
        sendMessage({ type: "update_chat_status" });
    };

    return sendChat;
}