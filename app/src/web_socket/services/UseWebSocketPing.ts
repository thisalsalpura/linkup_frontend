import React, { useEffect } from "react";
import { useWebSocket } from "../WebSocketProvider";
import { WSResponse } from "../Chat.Interfaces";

export function useWebSocketPing(interval: number) {
    const { socket, isConnected, sendMessage } = useWebSocket();

    useEffect(() => {
        if (!socket || !isConnected) return;

        const pingTimer = setInterval(() => {
            if (socket.readyState === WebSocket.OPEN) {
                sendMessage({ type: "PING" });
            }
        }, interval);

        const onMessage = (event: MessageEvent) => {
            const response: WSResponse = JSON.parse(event.data);
            if (response.type === "PONG") {
                console.log("WebSocket: PONG");
            }
        };

        socket.addEventListener("message", onMessage);

        return () => {
            clearInterval(pingTimer);
            socket.removeEventListener("message", onMessage);
        };
    }, [socket, isConnected, sendMessage, interval]);
}
