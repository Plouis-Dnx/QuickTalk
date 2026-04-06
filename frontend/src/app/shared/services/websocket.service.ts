import { Injectable } from "@angular/core";
import { Socket, io } from "socket.io-client";
import { environment } from "../../../environments/environment";
import { Message } from "../models/message.model";

@Injectable({providedIn: 'root'})
export class WebsocketService {
    private socket: Socket | null = null;

    connect(token: string) {
        if(this.socket?.connected) return;

        this.socket = io(`${environment.websocketUrl}/chat`, {
            transports: ['websocket'],
            auth: { token }
        });

        this.socket.on('connect', () => console.log("[WS] Connected"));
        this.socket.on('disconnect', () => console.log("[WS] Disonnected"));
    }

    sendMessage(message: Message) {
        console.log('socket connected:', this.socket?.connected);
        console.log('socket:', this.socket);

        this.socket?.emit('sendMessage', message);
    }

    onNewMessage(callback: (message: Message) => void) {
        this.socket?.on('newMessage', callback);
    }

    offNewMessage() {
        this.socket?.off('newMessage');
    }

    disconnect() {
        this.socket?.disconnect();
    }

    joinConversation(conversationId: string) {
        this.socket?.emit('joinConversation', { conversationId });
    }
}