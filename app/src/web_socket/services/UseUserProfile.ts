import React, { useEffect, useState } from "react";
import { useWebSocket } from "../WebSocketProvider";
import { User, WSResponse } from "../Chat.Interfaces";

export function useUserProfile(): { userProfile: User[]; setUserProfile: React.Dispatch<React.SetStateAction<User[]>>; loading: boolean; } {

    const { socket, sendMessage } = useWebSocket();

    const [loading, setLoading] = useState(false);

    const [userProfile, setUserProfile] = useState<User[]>([]);

    useEffect(() => {
        if (!socket) return;

        setLoading(true);
        sendMessage({ type: "get_user_profile" });

        const onMessage = (event: MessageEvent) => {
            let response: WSResponse = JSON.parse(event.data);
            if (response.type === "user_profile") {
                setUserProfile(response.data_set);
                setLoading(false);
            }
        };

        socket.addEventListener("message", onMessage);

        return () => {
            socket.removeEventListener("message", onMessage);
        }
    }, [socket]);

    return { userProfile, setUserProfile, loading };
}