import React, { useEffect, useState } from "react";
import { useWebSocket } from "../WebSocketProvider";
import { WSResponse } from "../Chat.Interfaces";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export function useAddNewContact(setShow: React.Dispatch<React.SetStateAction<boolean>>): { addNewContact: (data: any) => void; loading: boolean } {

    const { sendMessage, socket } = useWebSocket();

    const [loading, setLoading] = useState(false);

    const addNewContact = (user: any) => {
        setLoading(true);
        sendMessage({ type: "add_new_contact", user });
    };

    useEffect(() => {
        if (!socket) {
            return;
        }

        const onMessage = (event: MessageEvent) => {
            const response: WSResponse = JSON.parse(event.data);
            if (response.type === "add_new_contact_response") {
                setLoading(false);
                if (response.status) {
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'Success',
                        textBody: response.message,
                    });

                    setShow(false);
                } else {
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Warning',
                        textBody: response.message,
                    });
                }
            }
        };

        socket.addEventListener("message", onMessage);

        return () => {
            socket.removeEventListener("message", onMessage);
        };
    }, [socket]);

    return { addNewContact, loading };
}
