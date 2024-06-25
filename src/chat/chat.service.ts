import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Chat} from './chat.entity';
import {User} from '../user/user.entity';
import {CreateChatDto} from "./create-chat.dto";

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async createChat(createChatDto: CreateChatDto): Promise<Chat> {
        const user1 = await this.userRepository.findOne({where: {id: createChatDto.user1Id}});
        const user2 = await this.userRepository.findOne({where: {id: createChatDto.user2Id}});

        if (!user1 || !user2) {
            throw new Error('One or both users not found');
        }

        const chat = this.chatRepository.create({
            ...createChatDto,
            user1,
            user2
        });

        return this.chatRepository.save(chat);
    }

    async findAll(): Promise<Chat[]> {
        return this.chatRepository.find({relations: ['user1', 'user2', 'messages']});
    }

    async findOne(id: number): Promise<Chat> {
        return this.chatRepository.findOne({where: {id: id}, relations: ['user1', 'user2', 'messages']});
    }

    async remove(id: number): Promise<void> {
        await this.chatRepository.delete(id);
    }
}
