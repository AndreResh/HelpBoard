import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import {CreateMessageDto} from "./create-message.dto";

@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post()
    create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
        return this.messageService.createMessage(createMessageDto);
    }

    @Get(':chatId')
    findMessagesByChat(@Param('chatId') chatId: number): Promise<Message[]> {
        return this.messageService.findMessagesByChat(chatId);
    }
}
