import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import {CreateChatDto} from "./create-chat.dto";

@Controller('chats')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post()
    create(@Body() createChatDto: CreateChatDto): Promise<Chat> {
        return this.chatService.createChat(createChatDto);
    }

    @Get()
    findAll(): Promise<Chat[]> {
        return this.chatService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Chat> {
        return this.chatService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.chatService.remove(+id);
    }
}
