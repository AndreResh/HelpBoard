import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import {CreateMessageDto} from "./create-message.dto";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) {}

    async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
        const message = this.messageRepository.create(createMessageDto);
        return this.messageRepository.save(message);
    }

    async findMessagesByChat(chatId: number): Promise<Message[]> {
        return this.messageRepository.find({
            where: { chat: { id: chatId } },
            relations: ['author'],
            order: { sentAt: 'ASC' },
        });
    }
}
