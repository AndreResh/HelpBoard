import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { MessageService } from './message.service';
import { Chat } from './chat.entity';
import { Message } from './message.entity';
import {UserModule} from "../user/user.module";
import {User} from "../user/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Chat, Message, User]), UserModule],
    providers: [ChatService, MessageService, ChatGateway],
    controllers: [ChatController],
})
export class ChatModule {}
