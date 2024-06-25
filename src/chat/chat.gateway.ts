import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { MessageService } from './message.service';
import {CreateMessageDto} from "./create-message.dto";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly chatService: ChatService,
        private readonly messageService: MessageService,
    ) {}

    @SubscribeMessage('joinChat')
    async handleJoinChat(client: Socket, chatId: number): Promise<void> {
        client.join(`chat_${chatId}`);
        const messages = await this.messageService.findMessagesByChat(chatId);
        client.emit('chatHistory', messages);
    }

    @SubscribeMessage('sendMessage')
    async handleMessage(client: Socket, createMessageDto: CreateMessageDto): Promise<void> {
        const message = await this.messageService.createMessage(createMessageDto);
        this.server.to(`chat_${createMessageDto.chatId}`).emit('newMessage', message);
    }
}
