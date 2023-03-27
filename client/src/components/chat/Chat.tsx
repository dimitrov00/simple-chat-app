import { HubConnectionBuilder } from "@microsoft/signalr";
import { HubConnection } from "@microsoft/signalr/dist/esm/HubConnection";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { IChatMessage } from "../../interfaces/IChatMessage";
import ChatInput from "./ChatInput";
import ChatWindow from "./ChatWindow";

const Chat = () => {
    const [connection, setConnection] = useState<HubConnection>();
    const [messages, setMessages] = useState<IChatMessage[]>([]);
    const latestMessages = useRef<IChatMessage[]>([]);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(import.meta.env.VITE_CHAT_HUB_URL)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        latestMessages.current = messages;
    }, [messages]);

    useEffect(() => {
        async function startConnection() {
            try {
                if (!connection) return;

                await connection.start();
                console.log("Connected!");

                connection.on("ReceiveMessage", (message) => {
                    const updatedChat = [...latestMessages.current, message];

                    setMessages(updatedChat);
                });
            } catch (error) {
                console.log("Connection failed: ", error);
            }
        }

        startConnection();
    }, [connection]);

    async function sendMessage(user: string, message: string) {
        const chatMessage = {
            user: user,
            message: message,
        };

        try {
            await fetch(import.meta.env.VITE_SERVER_API + "/chat/messages", {
                method: "POST",
                body: JSON.stringify(chatMessage),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (e) {
            console.log("Sending message failed.", e);
        }
    }

    return (
        <div>
            <ChatInput sendMessage={sendMessage} />
            <hr />
            <ChatWindow messages={messages} />
        </div>
    );
};

export default Chat;
