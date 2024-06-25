import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Chat } from './chat.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @CreateDateColumn()
    sentAt: Date;

    @ManyToOne(() => User)
    author: User;

    @ManyToOne(() => Chat, chat => chat.messages)
    chat: Chat;
}
